import React from 'react';
import * as z from 'zod';

import { useCreateNoteDot } from 'shared/api/hooks/useCreateNoteDot';
import { CreateDotForm } from 'shared/components/forms/CreateDotForm';
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

const schema = z.object({
  dot: z
    .string()
    .max(15, {
      message: 'Title must not be longer than 15 characters.',
    })
    .min(2, {
      message: 'Dot must not be shorter than 2 characters.',
    }),
});

type FormValues = z.infer<typeof schema>

const CreateNoteDotModal = ({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useCreateNoteDot(noteId);

  const onSubmit = React.useCallback(async (values: FormValues) => {
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