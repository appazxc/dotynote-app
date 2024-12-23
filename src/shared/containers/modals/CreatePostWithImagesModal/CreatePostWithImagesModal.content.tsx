import { IconButton } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createPost } from 'shared/actions/post/createPost';
import { createSeparatePosts } from 'shared/actions/post/createSeparatePosts';
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
import { DotsIcon } from 'shared/components/ui/icons';
import { ORDER_BY_IDS } from 'shared/constants/orderByIds';
import { ImagesGrid } from 'shared/containers/modals/CreatePostWithImagesModal/ImagesGrid';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import { selectFilteredFilesByTag } from 'shared/modules/fileUpload/selectors';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type OnCreateParams = {
  single: true,
  postId: number,
} | {
  single: false,
  postIds: number[]
}

export type Props = {
  noteId: number,
  onCreate?: (params: OnCreateParams) => void,
}

const schema = z.object({
  separatePosts: z.boolean(),
});

type FormValues = z.infer<typeof schema>

const CreatePostWithImagesModal = ({ noteId, onCreate }: Props) => {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobile);
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Missing note');

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    getValues,
    watch,
  } = useForm<FormValues>({ 
    defaultValues: {
      separatePosts: false,
    },
    resolver: zodResolver(schema) });

  watch('separatePosts');
    
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

  const handleReorder = React.useCallback((fileIds: string[]) => {
    reorderFiles(fileIds);
  }, [reorderFiles]);

  const onSubmit = React.useCallback(async (values: FormValues) => {
    const separatePosts = imgFiles.length > 1 && values.separatePosts;
    
    try {
      if (separatePosts) {
        await dispatch(createSeparatePosts({
          parentId: noteId,
          files: imgFiles,
          onPostsCreated: (postIds: number[]) => {
            dispatch(hideModal());
            onCreate?.({ single: false, postIds });
          },
          removeFiles,
        }));
      } else {
        await dispatch(createPost({
          parentId: noteId,
          files: imgFiles,
          onPostCreated: (postId: number) => {
            dispatch(hideModal());
            onCreate?.({ single: true, postId });
          },
          removeFiles,
        }));

      }
    } catch(_) {
      dispatch(hideModal());
    }
  }, [dispatch, noteId, onCreate, removeFiles, imgFiles]);

  const canSeparatePosts = 
    (!note.postsSettings || note.postsSettings.orderById === ORDER_BY_IDS.POSITION) 
    && imgFiles.length > 1;
  const showOptionsMenu = canSeparatePosts;

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
              inSeparatePosts={getValues().separatePosts}
            />
          </DialogBody>
          <DialogFooter
            display="flex"
            justifyContent={showOptionsMenu ? 'space-between' : undefined}
            alignItems="center"
          >
            {showOptionsMenu && (
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
                  {canSeparatePosts && (
                    <FormField
                      control={control}
                      name="separatePosts"
                      render={({ field }) => {
                        return (
                          <MenuItem
                            label={<MenuLabel checked={field.value} label="Divide into separate posts" />}
                            onClick={() => field.onChange(!field.value)}
                          />
                        );
                      }}
                    />
                  )}
                </MenuList>
              </Menu>
            )}
           
            <Button
              type="submit"
              colorScheme="brand"
              loading={isSubmitting}
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