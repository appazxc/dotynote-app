import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';

import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { EntryMediaContent } from 'shared/modules/entry/EntryMediaContent';
import { EntryMediaSelect } from 'shared/modules/entry/EntryMediaSelect';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  noteId: number,
  canAddToNote: boolean,
  canAddToPosts: boolean,
  modalsExtraId: string,
}

const DotNoteMenuDrawer = (props: Props) => {
  const { noteId, modalsExtraId, canAddToNote, canAddToPosts } = props;
  const dispatch = useAppDispatch();
  
  const onClose = () => {
    dispatch(hideDrawer());
  };

  return (
    <Drawer
      isOpen
      placement="bottom"
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent borderTopLeftRadius="lg" borderTopRightRadius="lg">
        <DrawerHeader>
          <EntryMediaSelect
            noteId={noteId}
            canAddToNote={canAddToNote}
            canAddToPosts={canAddToPosts}
          />
        </DrawerHeader>
        <DrawerBody>
          <EntryMediaContent
            noteId={noteId}
            createPostModalExtraId={modalsExtraId}
            editPostsSettingsModalExtraId={modalsExtraId}
            onFinish={onClose}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DotNoteMenuDrawer;