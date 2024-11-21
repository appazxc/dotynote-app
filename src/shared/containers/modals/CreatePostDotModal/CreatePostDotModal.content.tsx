import React from 'react';
import * as z from 'zod';

import { useCreatePostDot } from 'shared/api/hooks/useCreatePostDot';
import { CreateDotForm } from 'shared/components/forms/CreateDotForm';
import {
  DialogBackdrop,
  DialogContent,
  DialogRoot,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  postId: number,
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

const CreatePostDotModal = ({ postId }: Props) => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useCreatePostDot(postId);

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

export default CreatePostDotModal;