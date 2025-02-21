import { Box, Float } from '@chakra-ui/react';
import React from 'react';

import { useDeleteNoteImage } from 'shared/api/hooks/useDeleteNoteImage';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { NoteImage } from 'shared/components/NoteImages/NoteImage';
import { Checkbox } from 'shared/components/ui/checkbox';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, startSelectNoteImagesOperation, toggleSelectNoteImage } from 'shared/store/slices/appSlice';

type WithImageControlsProps = {
  imageId: string;
  noteId: number;
  hasControls?: boolean;
  src: string;
  width: number;
  height: number;
  blurhash: string;
  onClick?: () => void;
}

export const ImageWithControls = React.memo((props: WithImageControlsProps) => {
  const { noteId, imageId, src, height, width, hasControls, blurhash, onClick } = props;
  const operation = useAppSelector(selectOperation);
  const dispatch = useAppDispatch();

  const { mutate: deleteNoteImage } = useDeleteNoteImage();

  const isSelecting = operation.type === operationTypes.SELECT_NOTE_IMAGES && operation.noteId === noteId;
  const isSelected = isSelecting && operation.imageIds.includes(imageId);

  const handleImageClick = React.useCallback((event) => {
    event.stopPropagation();
    
    if (isSelecting) {
      dispatch(toggleSelectNoteImage(imageId));
    } else {
      onClick?.();
    }
  }, [dispatch, imageId, onClick, isSelecting]);

  const handleImageSelect = React.useCallback(() => {
    if (!isSelecting) {
      dispatch(startSelectNoteImagesOperation({ imageId, noteId }));
    }
  }, [dispatch, imageId, isSelecting, noteId]);

  const handleDeleteImage = React.useCallback(() => {
    deleteNoteImage({ imageId, noteId });
  }, [deleteNoteImage, noteId, imageId]);

  return (
    <Menu isContextMenu enabled={hasControls && !isSelecting}>
      <MenuTrigger>
        <Box
          position="relative"
          cursor="pointer"
        >
          <NoteImage
            src={src}
            height={height}
            width={width}
            blurhash={blurhash}
            onClick={handleImageClick}
          />
          {isSelecting && (
            <Float offset="15px" placement="top-end">
              <Checkbox
                borderRadius="full"
                colorPalette="blue"
                radius="full"
                checked={isSelected}
              />
            </Float>
          )}
        </Box>
      </MenuTrigger>
      <MenuList>
        <MenuItem
          label="Select"
          onClick={handleImageSelect}
        />
        <MenuItem
          label={'Delete'}
          color="red"
          onClick={handleDeleteImage}
        />
      </MenuList>
    </Menu>
  );
});
