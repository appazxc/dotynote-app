import { Portal } from '@chakra-ui/react';

import { DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader, DrawerRoot } from 'shared/components/ui/drawer';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { EntryMediaContent } from 'shared/modules/entry/EntryMediaContent';
import { EntryMediaSelect } from 'shared/modules/entry/EntryMediaSelect';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { OpenChangeDetails } from 'shared/types/drawer';

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
  
  const handleClose = () => {
    dispatch(hideDrawer());
  };

  const handleOpenChange = (details: OpenChangeDetails) => {
    if (!details.open) {
      handleClose();
    }
  };

  return (
    <DrawerRoot
      open
      placement="bottom"
      onOpenChange={handleOpenChange}
    >
      <Portal>
        <DrawerBackdrop />
        <DrawerContent roundedTop="md">
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
              onFinish={handleClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Portal>

    </DrawerRoot>
  );
};

export default NoteMenuDrawer;