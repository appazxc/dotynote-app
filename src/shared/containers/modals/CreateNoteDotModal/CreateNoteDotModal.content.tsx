import React from 'react';

import { useCreateNoteDot } from 'shared/api/hooks/useCreateNoteDot';
import { CreateDotForm, CreateDotFormValues } from 'shared/components/forms/CreateDotForm';
import {
  DialogBackdrop,
  DialogContent,
  DialogRoot,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  noteId: number,
}

const CreateNoteDotModal = ({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useCreateNoteDot(noteId);

  const onSubmit = React.useCallback(async (values: CreateDotFormValues) => {
    try {
      await mutateAsync({ text: values.dot });
    } finally {
      dispatch(hideModal());
    }
  }, [dispatch, mutateAsync]);

  return (
    <DialogRoot
      open
      placement="center"
      size="xs"
      scrollBehavior="inside"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent>
        <CreateDotForm onSubmit={onSubmit} />
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateNoteDotModal;