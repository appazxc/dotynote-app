import React from 'react';

import { useToast } from '@chakra-ui/react';
import { invariant } from '@tanstack/react-router';

import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { useTabNote } from 'shared/modules/noteTab/hooks/useTabNote';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import {
  PrimaryNoteOperation as PrimaryNoteOperationType,
  stopOperation,
} from 'shared/store/slices/appSlice';

import { Operation } from './Operation';

type Props = PrimaryNoteOperationType;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PrimaryNoteOperation = React.memo((props: Props) => {
  const dispatch = useAppDispatch();
  const note = useTabNote();
  const spaceId = useAppSelector(selectActiveSpaceId);
  const toast = useToast();
  
  invariant(spaceId, 'Missing spaceId');

  const { mutateAsync, isPending } = useUpdateSpace(spaceId);

  const handleConfirm = React.useCallback(() => {
    mutateAsync({
      mainNoteId: note.id,
    }).then(() => {
      toast({
        description: 'Primary note changed.',
      });
      dispatch(stopOperation());
    });
  }, [mutateAsync, note.id, toast, dispatch]);

  return (
    <>
      <Operation
        title={'Assign this note as primary'}
        isLoading={isPending}
        onConfirm={handleConfirm}
      />
    </>
  );
});
