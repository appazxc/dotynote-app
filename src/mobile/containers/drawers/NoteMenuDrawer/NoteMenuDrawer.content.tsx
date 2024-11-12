import {
  DrawerRoot,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerBackdrop,
} from '@chakra-ui/react';

import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { EntryMediaContent } from 'shared/modules/entry/EntryMediaContent';
import { EntryMediaSelect } from 'shared/modules/entry/EntryMediaSelect';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

export type Props = {
  noteId: number,
}

const NoteMenuDrawer = (props: Props) => {
  const { noteId } = props;
  const dispatch = useAppDispatch();
  const note = useAppSelector(state => noteSelector.getById(state, noteId));

  if (!note) {
    return null;
  }
  
  const onClose = () => {
    dispatch(hideDrawer());
  };

  return (
    <DrawerRoot
      open
      placement="bottom"
      onOpenChange={onClose}
    >
      <DrawerBackdrop />
      <DrawerContent borderTopLeftRadius="lg" borderTopRightRadius="lg">
        <DrawerHeader>
          <EntryMediaSelect
            noteId={noteId}
            canAddToNote={note.permissions.update}
            canAddToPosts={note.permissions.createPost}
          />
        </DrawerHeader>
        <DrawerBody>
          <EntryMediaContent
            noteId={noteId}
            onFinish={onClose}
          />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default NoteMenuDrawer;