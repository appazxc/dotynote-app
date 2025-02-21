import { Box, Grid, Group, IconButton, Image } from '@chakra-ui/react';
import {
  closestCenter,
  defaultDropAnimation,
  DndContext,
  DragEndEvent,
  DraggableSyntheticListeners,
  DragOverlay,
  MeasuringStrategy,
  MouseSensor,
  TouchSensor,
  useDndContext,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { arrayMove, rectSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { motion } from 'motion/react';
import React from 'react';
import { SiOneplus } from 'react-icons/si';

import { DeleteIcon } from 'shared/components/ui/icons';
import { UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';

const ANIMATION_DURATION_MS = 750;

type ImagesGridProps = {
  imgFiles: UploadFile[];
  imgFileIds: string[];
  setImgFileIds: (fileIds: string[]) => void;
  inSeparatePosts: boolean;
  handleFileRemove: (fileId: string) => void;
}

const activationConstraint = {
  distance: 10,
};

export const ImagesGrid = (props: ImagesGridProps) => {
  const { imgFiles, imgFileIds, setImgFileIds, inSeparatePosts, handleFileRemove } = props;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint,
    }),
    useSensor(TouchSensor, {
      activationConstraint,
    })
  );
  const [activeId, setActiveId] = React.useState(null);

  function handleDragStart({ active }) {
    setActiveId(active.id);
  }

  function handleDragEnd() {
    setActiveId(null);
  }

  function handleDragMove({ active, over }: DragEndEvent) {
    if (!over) {
      return;
    }

    setImgFileIds(
      arrayMove(imgFileIds, imgFileIds.indexOf(String(active.id)), imgFileIds.indexOf(String(over.id)))
    );
  }

  function onDragCancel(){
    setActiveId(null);
  }

  const activeIdUrl = imgFiles.find(({ fileId }) => fileId === activeId)?.objectUrl;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragMove}
      onDragCancel={onDragCancel}
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
              showSeparateIcon={inSeparatePosts && imgFiles.length > 1}
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
        {activeId && activeIdUrl ? (
          <DragOverlayItem 
            id={activeId} 
            src={activeIdUrl}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

type ImageItemProps = { 
  src: string; 
  listeners?: DraggableSyntheticListeners; 
}

const ImageItem = ({ src, listeners }: ImageItemProps) => {
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

type SortableItemProps = {
  id: string;
  src: string | null; 
  showSeparateIcon: boolean; 
  onRemove: (fileId: string) => void;
}

const SortableItem = React.memo(({ id, src, showSeparateIcon, onRemove }: SortableItemProps) => {
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
        <Box
          position="absolute"
          right="5px"
          bottom="5px"
        >
          <Group attached={showSeparateIcon}>
            {showSeparateIcon && (
              <IconButton
                size="2xs"
                colorPalette="yellow"
                variant="subtle"
                cursor="default"
              >
                <SiOneplus />
              </IconButton>
            )}
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
          </Group>
        </Box>
      </motion.div>
    </Box>
  ) : null;
});

// https://github.com/clauderic/dnd-kit/issues/605
function DragOverlayItem(props: { id: string; src: string }) {
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
          scale: isReallyActive ? 1.1 : 1,
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