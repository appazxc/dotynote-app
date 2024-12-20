import { Box, Float, Grid, IconButton, Image } from '@chakra-ui/react';
import {
  closestCenter,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DraggableSyntheticListeners,
  DragOverlay,
  MeasuringStrategy,
  PointerSensor,
  useDndContext,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import * as z from 'zod';

import { addMediaToPost } from 'shared/actions/post/addMediaToPost';
import { useCreatePost } from 'shared/api/hooks/useCreatePost';
import { FormField } from 'shared/components/Form';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { MenuLabel } from 'shared/components/Menu/MenuLabel';
import { Button } from 'shared/components/ui/button';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from 'shared/components/ui/dialog';
import { DeleteIcon, DotsIcon } from 'shared/components/ui/icons';
import Popover from 'shared/containers/modals/CreatePostWithImagesModal/Popover';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import { selectFilteredFilesByTag } from 'shared/modules/fileUpload/selectors';
import { updateFile } from 'shared/modules/fileUpload/uploadSlice';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

export type Props = {
  noteId: number,
  onCreate?: (id: number) => void,
}

const ANIMATION_DURATION_MS = 750;

const schema = z.object({
  separatePosts: z.boolean(),
});

type FormValues = z.infer<typeof schema>

type FileImageProps = {
  id: string,
  src: string | null, 
  onRemove: (fileId: string) => void
}

const ImageItem = ({ src, listeners }: { src: string, listeners?: DraggableSyntheticListeners }) => {
  return (
    <Image
      src={src}
      alt="Image"
      rounded="md"
      w="full"
      background="gray.300"
      aspectRatio={1}
      fit="cover"
      {...listeners}
    />
  );
};

const SortableItem = React.memo(({ id, src, onRemove }: FileImageProps) => {
  const { 
    attributes, 
    listeners, 
    setNodeRef,
    isDragging,
  } = useSortable({ 
    id,
  });

  const style = {
    zIndex: isDragging ? 1 : 0,
  };

  return src ? (
    <Box
      ref={setNodeRef}
      asChild
      position="relative"
      style={style}
    >
      <motion.div
        layout
        animate={{ opacity: isDragging ? 0.6 : 1 }}
        transition={{
          type: 'spring',
          duration: ANIMATION_DURATION_MS / 1000,
        }}
        {...attributes}
      >
        <ImageItem 
          src={src}
          listeners={listeners}
        />
        <Float placement="bottom-end" offset="15px">
          <IconButton
            size="2xs"
            colorPalette="gray"
            variant="subtle"
            onClick={() => {
              onRemove(id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Float>
      </motion.div>
    </Box>
  ) : null;
});

const ImagesGrid = ({ imgFiles, imgFileIds, setImgFileIds, handleFileRemove }) => {
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  }));
  const [activeId, setActiveId] = React.useState(null);

  function handleDragStart({ active }) {
    setActiveId(active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  function handleDragMove({ active, over }: DragEndEvent) {
    setImgFileIds(
      arrayMove(imgFileIds, imgFileIds.indexOf(active.id), imgFileIds.indexOf(over?.id))
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragMove}
    >
      <SortableContext items={imgFileIds} strategy={rectSortingStrategy}>
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap="5px"
        >
          {imgFiles.map(({ fileId, objectUrl }) => (
            <SortableItem
              key={fileId}
              id={fileId}
              src={objectUrl}
              onRemove={handleFileRemove}
            />
          ))}
        </Grid>
      </SortableContext>
      <DragOverlay
        dropAnimation={{
          ...defaultDropAnimation,
          duration: ANIMATION_DURATION_MS / 2,
        }}
      >
        {activeId ? (
          <DragOverlayItem id={activeId} src={imgFiles.find(({ fileId }) => fileId === activeId).objectUrl} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

// https://github.com/clauderic/dnd-kit/issues/605
function DragOverlayItem(props: { id: string, src: string }) {
  const { id, src } = props;

  // DragOver seems to cache this component so I can't tell if the item is still actually active
  // It will remain active until it has settled in place rather than when dragEnd has occured
  // I need to know when drag end has taken place to trigger the scale down animation
  // I use a hook which looks at DndContex to get active

  const isReallyActive = useDndIsReallyActiveId(id);

  // I've wrapped the Framer Motion component with a div
  //
  // - This is so that DragOverlay can successfully apply the dragSourceOpacity
  //   I assume Framer is overwriting the dragSourceOpacity style
  //
  // - It would be great if there was a prop under Sortable called isSettling
  //   This would allow Framer to control all animation

  return (
    <div>
      <motion.div
        animate={{
          scale: isReallyActive ? 1.2 : 1,
        }}
        transition={{
          type: 'spring',
          duration: ANIMATION_DURATION_MS / 1000,
        }}
      >
        <ImageItem src={src} />
      </motion.div>
    </div>
  );
}

function useDndIsReallyActiveId(id: string) {
  const context = useDndContext();
  const isActive = context.active?.id === id;
  return isActive;
}

const CreatePostWithImagesModal = ({ noteId, onCreate }: Props) => {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobile);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormValues>({ 
    defaultValues: {
      separatePosts: false,
    },
    resolver: zodResolver(schema) });

  const { mutateAsync, isPending } = useCreatePost(noteId);

  const { files, removeFiles, reorderFiles } = useFileUpload();

  const imgFiles = useAppSelector(state => 
    selectFilteredFilesByTag(state, { 
      files, 
      tag: buildFileTag({ zone: 'post', zoneId: noteId, type: 'image' }),
      status: 'idle',
    }));

  const imgFileIds = React.useMemo(() => imgFiles.map(({ fileId }) => fileId), [imgFiles]);

  const handleFileRemove = React.useCallback((fileId) => {
    if (imgFiles.length === 1) {
      dispatch(hideModal());
    }
    removeFiles([fileId]);
  }, [dispatch, removeFiles, imgFiles]);

  const handleReorder = React.useCallback((fileIds) => {
    reorderFiles(fileIds);
  }, [reorderFiles]);

  const onSubmit = React.useCallback(async (values: FormValues) => {
    const separatePosts = imgFiles.length > 1 && values.separatePosts;
    
    try {
      const id = await mutateAsync({});
      
      imgFiles.forEach(({ fileId }) => {
        dispatch(updateFile({
          fileId,
          zone: 'note',
          zoneId: id,
        }));
      });

      dispatch(addMediaToPost(id, imgFiles, removeFiles));
      if (onCreate) {
        onCreate(id);
      }
    } finally {
      dispatch(hideModal());
    }
  }, [dispatch, mutateAsync, onCreate, removeFiles, imgFiles]);

  return (
    <DialogRoot
      open
      placement={!isMobile ? 'center' : undefined}
      size={isMobile ? 'full' : 'sm'}
      scrollBehavior="inside"
      onOpenChange={() => {
        removeFiles(imgFiles.map(({ fileId }) => fileId ));
        dispatch(hideModal());
      }}
    >
      <DialogBackdrop />
      <DialogContent asChild>
        <motion.form
          layout 
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogHeader>
            <DialogTitle>{imgFiles.length} media</DialogTitle>
          </DialogHeader>
          <DialogBody
            pt="0"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            display="flex"
            flexDirection="column"
            gap="1"
          >
            <ImagesGrid 
              imgFiles={imgFiles}
              imgFileIds={imgFileIds}
              setImgFileIds={handleReorder}
              handleFileRemove={handleFileRemove}
            />
          </DialogBody>
          <DialogFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Menu 
              placement="top-start"
              inPortal={false}
            >
              <MenuTrigger
                as={IconButton}
                iconSize="auto"
                aria-label="Options"
                variant="ghost"
              >
                <DotsIcon />
              </MenuTrigger>
              <MenuList>
                <FormField
                  control={control}
                  name="separatePosts"
                  render={({ field }) => {
                    console.log('field.value', field.value);
                    return (
                      <MenuItem
                        label={<MenuLabel checked={field.value} label="Divide into separate posts" />}
                        onClick={() => field.onChange(!field.value)}
                      />
                    );
                  }}
                />
                
              </MenuList>
            </Menu>
            <Button
              type="submit"
              colorScheme="brand"
              loading={isPending}
            >
              Create
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </motion.form>
      </DialogContent>
    </DialogRoot>
  );
};

export default CreatePostWithImagesModal;