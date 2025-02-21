import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { SpaceModalForm } from 'shared/components/forms/SpaceModalForm';
import {
  DialogBackdrop,
  DialogRoot,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { spaceSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export type Props = {
  id: string;
}

const EditSpaceModal = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const { mutateAsync } = useUpdateSpace(id);
  const space = useAppSelector(state => spaceSelector.getEntityById(state, id));
  
  invariant(space, 'Missing spaceId');

  const defaultValues = {
    name: space.name,
  };

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
        title="Edit space"
        submitText="Save"
        defaultValues={defaultValues}
        onSubmit={onSubmit}
      />
    </DialogRoot>
  );
};

export default EditSpaceModal;