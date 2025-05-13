import { LuPlus } from 'react-icons/lu';

import { Button } from 'shared/components/ui/button';
import { drawerIds } from 'shared/constants/drawerIds';
import { showDrawer } from 'shared/modules/drawer/drawerSlice';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: string;
}

export const NotePlusButton = ({ noteId }: Props) => {
  const dispatch = useAppDispatch();
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

  invariant(note, 'Note not found');

  const { permissions } = note;
  const canAddToNote = permissions.update && !note.settings?.hide;
  const canAddToPosts = !!permissions.createPost && note.postsSettings?.listType !== 'all';
  const canAdd = canAddToNote || canAddToPosts;
  const showAddTo = (permissions.update || permissions.createPost) && canAdd;

  return (
    <Button
      borderRadius="full"
      position="absolute"
      right="16px"
      bottom="10px"
      w="55px"
      h="55px"
      onClick={() => {
        if (showAddTo) {
          dispatch(showDrawer({ id: drawerIds.dotNoteMenu }));
        } else {
          dispatch(showDrawer({ id: drawerIds.createNote }));
        }
      }}
    >
      <LuPlus />
    </Button>
  );
};
