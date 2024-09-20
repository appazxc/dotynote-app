import React from 'react';

import { Box } from '@chakra-ui/react';

import { OperationWrapper } from 'shared/modules/noteTab/components/Operations/OperationWrapper';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { useAppDispatch } from 'shared/store/hooks';
import { SelectOperation as SelectOperationType, stopOperation } from 'shared/store/slices/appSlice';

type Props = SelectOperationType;

export const SelectOperation = React.memo((props: Props) => {
  const { postIds, noteId } = props;
  const note = useTabNote();

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(stopOperation());
  };

  if (note.id !== noteId) {
    return null;
  }

  return (
    <OperationWrapper onClose={handleClose}>
      <Box>
      select operation
      </Box>
    </OperationWrapper>
  );
});
