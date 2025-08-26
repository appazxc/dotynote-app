import { Box, Float } from '@chakra-ui/react';
import React from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useDeleteNoteImage } from 'shared/api/hooks/useDeleteNoteImage';
import { BaseImage } from 'shared/components/BaseImage';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { ImageError } from 'shared/components/NoteImages/ImageError';
import { useImageLoadStore } from 'shared/components/NoteImages/useImageLoadStore';
import { Checkbox } from 'shared/components/ui/checkbox';
import { noteImageSelector } from 'shared/selectors/entities';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, startSelectNoteImagesOperation, toggleSelectNoteImage } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

type WithImageControlsProps = {
  imageId: string;
  noteId: string;
  hasControls?: boolean;
  src: string;
  width: number;
  height: number;
  index: number;
  onClick?: (index: number) => void;
}

export const ImageWithControls = React.memo((props: WithImageControlsProps) => {
  const { noteId, imageId, src, height, width, hasControls, index, onClick } = props;
  const operation = useAppSelector(selectOperation);
  const dispatch = useAppDispatch();
  const noteImage = useAppSelector(state => noteImageSelector.getById(state, imageId));
  const { setImageLoaded, setImageError, resetImageState } = useImageLoadStore(
    useShallow((state) => ({
      setImageLoaded: state.setImageLoaded,
      setImageError: state.setImageError,
      resetImageState: state.resetImageState,
    })));
  const imageLoadState = useImageLoadStore(((state) => state.getImageState(imageId)));

  invariant(noteImage, 'Note image not found');

  const { blurhash } = noteImage;
  const { isError: hasError, isLoaded } = imageLoadState;
  const { mutate: deleteNoteImage } = useDeleteNoteImage();

  const isSelecting = operation.type === operationTypes.SELECT_NOTE_IMAGES && operation.noteId === noteId;
  const isSelected = isSelecting && operation.imageIds.includes(imageId);

  const handleImageClick = React.useCallback((event) => {
    event.stopPropagation();
    
    if (isSelecting) {
      dispatch(toggleSelectNoteImage(imageId));
    } else {
      onClick?.(index);
    }
  }, [dispatch, index, imageId, onClick, isSelecting]);

  const handleImageSelect = React.useCallback(() => {
    if (!isSelecting) {
      dispatch(startSelectNoteImagesOperation({ imageId, noteId }));
    }
  }, [dispatch, imageId, isSelecting, noteId]);

  const handleDeleteImage = React.useCallback(() => {
    deleteNoteImage({ entityId: imageId, noteId });
  }, [deleteNoteImage, noteId, imageId]);

  const handleRetry = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    resetImageState(imageId);
  }, [resetImageState, imageId]);

  return (
    hasError ? (
      <ImageError 
        width={width} 
        height={height} 
        onRetry={handleRetry} 
      />
    ) : (
      <Menu isContextMenu enabled={hasControls && !isSelecting}>
        <MenuTrigger>
          <Box
            position="relative"
            cursor="pointer"
          >
            <BaseImage
              src={src}
              height={height}
              width={width}
              blurhash={blurhash}
              isLoaded={isLoaded}
              onClick={handleImageClick}
              onLoad={() => {
                setImageLoaded(imageId);
              }}
              onError={() => {
                setImageError(imageId);
              }}
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
    )
  );
});
