import { Box, Float } from '@chakra-ui/react';
import React from 'react';

import { useDeleteNoteImage } from 'shared/api/hooks/useDeleteNoteImage';
import { BaseImage } from 'shared/components/BaseImage';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { ImageError } from 'shared/components/NoteImages/ImageError';
import { Checkbox } from 'shared/components/ui/checkbox';
import { entityNames } from 'shared/constants/entityNames';
import { noteImageSelector } from 'shared/selectors/entities';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, startSelectNoteImagesOperation, toggleSelectNoteImage } from 'shared/store/slices/appSlice';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { invariant } from 'shared/util/invariant';

type WithImageControlsProps = {
  imageId: string;
  noteId: string;
  hasControls?: boolean;
  src: string;
  width: number;
  height: number;
  onClick?: () => void;
}

export const ImageWithControls = React.memo((props: WithImageControlsProps) => {
  const { noteId, imageId, src, height, width, hasControls, onClick } = props;
  const operation = useAppSelector(selectOperation);
  const dispatch = useAppDispatch();
  const noteImage = useAppSelector(state => noteImageSelector.getById(state, imageId));

  invariant(noteImage, 'Note image not found');

  const { blurhash, _isError: hasError, _isLoaded: isLoaded } = noteImage;
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
    deleteNoteImage({ entityId: imageId, noteId });
  }, [deleteNoteImage, noteId, imageId]);

  return (
    <Menu isContextMenu enabled={hasControls && !isSelecting}>
      <MenuTrigger>
        <Box
          position="relative"
          cursor="pointer"
        >
          {hasError ? (
            <ImageError width={width} height={height} />
          ) : (
            <BaseImage
              src={src}
              height={height}
              width={width}
              blurhash={blurhash}
              isLoaded={isLoaded}
              onClick={handleImageClick}
              onLoad={() => {
                dispatch(updateEntity({
                  type: entityNames.noteImage,
                  id: imageId,
                  data: {
                    _isLoaded: true,
                  },
                }));
              }}
              onError={() => {
                dispatch(updateEntity({
                  type: entityNames.noteImage,
                  id: imageId,
                  data: {
                    _isError: true,
                  },
                }));
              }}
            />
          )}
          
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
