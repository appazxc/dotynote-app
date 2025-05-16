import { Portal } from '@chakra-ui/react';

import { DrawerBackdrop, DrawerBody, DrawerContent, DrawerRoot } from 'shared/components/ui/drawer';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { ContentPicker } from 'shared/modules/noteTab/components/ContentPicker';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { OpenChangeDetails } from 'shared/types/drawer';

export type Props = {
  noteId: string;
}

const NoteMenuDrawer = (props: Props) => {
  const { noteId } = props;
  const dispatch = useAppDispatch();
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));

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
          <DrawerBody>
            <ContentPicker
              noteId={noteId}
              canAddToNote={note.permissions.update && !note.settings?.hide}
              canAddToPosts={!!note.postsPermissions?.createPost} 
              type="tabs"
              view="list"
              onClose={handleClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Portal>
    </DrawerRoot>
  );
};

export default NoteMenuDrawer;