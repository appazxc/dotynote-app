import { useCreateSpace } from 'shared/api/hooks/useCreateSpace';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { SpaceModalForm } from 'shared/components/forms/SpaceModalForm';
import {
  DialogBackdrop,
  DialogRoot,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = Record<string, never>

const CreateSpaceModal = () => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useCreateSpace();

  async function onSubmit(values) {
    try {
      await mutateAsync(values);
    } finally {
      await queryClient.invalidateQueries({ queryKey: options.spaces.userList().queryKey });
      dispatch(hideModal());
    }
  }

  return (
    <DialogRoot
      defaultOpen
      placement="center"
      size="md"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <SpaceModalForm
        title="Create space"
        submitText="Create"
        onSubmit={onSubmit}
      />
    </DialogRoot>
  );
};

export default CreateSpaceModal;