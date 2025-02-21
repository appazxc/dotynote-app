import React from 'react';

import { useCreatePostDot } from 'shared/api/hooks/useCreatePostDot';
import { CreateDotForm, CreateDotFormValues } from 'shared/components/forms/CreateDotForm';
import {
  DialogBackdrop,
  DialogContent,
  DialogRoot,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  postId: number;
}

const CreatePostDotModal = ({ postId }: Props) => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useCreatePostDot(postId);

  const onSubmit = React.useCallback(async (values: CreateDotFormValues) => {
    dispatch(hideModal());
    await mutateAsync({ text: values.dot });
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