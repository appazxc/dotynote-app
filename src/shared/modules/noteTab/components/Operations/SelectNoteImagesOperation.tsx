import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

import { useDeleteNoteImage } from 'shared/api/hooks/useDeleteNoteImage';
import { Button } from 'shared/components/ui/button';
import { OperationWrapper } from 'shared/modules/noteTab/components/Operations/OperationWrapper';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { useAppDispatch } from 'shared/store/hooks';
import {
  SelectNoteImagesOperation as SelectOperationType,
  stopOperation,
} from 'shared/store/slices/appSlice';

type Props = SelectOperationType;

export const SelectNoteImagesOperation = React.memo((props: Props) => {
  const { imageIds, noteId } = props;
  const note = useTabNote();
  const dispatch = useAppDispatch();

  const { mutate: deleteImage } = useDeleteNoteImage();
  
  const handleDeleteSelectedImages = React.useCallback(() => {
    dispatch(stopOperation());
    
    Promise.all(imageIds.map(imageId => {
      return deleteImage({ noteId, imageId });
    }));
  }, [dispatch, noteId, deleteImage, imageIds]);
 
  if (note.id !== noteId) {
    return null;
  }

  const handleClose = () => {
    dispatch(stopOperation());
  };

  return (
    <>
      <OperationWrapper py="1" onClose={handleClose}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pl="4"
        >
          <Text
            whiteSpace="nowrap"
            fontSize="sm"
          >
            Selected <Text as="span" fontWeight="600">{imageIds.length}</Text>
          </Text>
          <Button
            color="red.500"
            variant="plain"
            // size="lg"
            onClick={handleDeleteSelectedImages}
          >
            <AiOutlineDelete /> Delete
          </Button>
        </Box>
      </OperationWrapper>
    </>
  );
});
