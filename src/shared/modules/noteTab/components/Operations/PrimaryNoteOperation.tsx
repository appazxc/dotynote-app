import { invariant } from '@tanstack/react-router';
import React from 'react';

import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { toaster } from 'shared/components/ui/toaster';
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
  
  invariant(spaceId, 'Missing spaceId');

  const { mutateAsync, isPending } = useUpdateSpace(spaceId);

  const handleConfirm = React.useCallback(() => {
    mutateAsync({
      mainNoteId: note.id,
    }).then(() => {
      toaster.create({
        description: 'Primary note changed.',
      });
      dispatch(stopOperation());
    });
  }, [mutateAsync, note.id, dispatch]);

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
