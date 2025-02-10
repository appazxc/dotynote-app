import { Portal, Text } from '@chakra-ui/react';

import { NoteMediaCards } from 'shared/components/NoteMediaCards';
import { DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader, DrawerRoot } from 'shared/components/ui/drawer';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { OpenChangeDetails } from 'shared/types/drawer';

export type Props = {
  onCreate: (noteId: number) => void,
}

const CreateNoteDrawer = ({ onCreate }: Props) => {
  const dispatch = useAppDispatch();
  
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
            <Text fontSize="md">Create note</Text>
          </DrawerHeader>
          <DrawerBody pb="4">  
            <NoteMediaCards
              isMobile
              loaderHeight="186px"
              onTextClick={() => {
                dispatch(hideDrawer());
              }}
              onCreate={onCreate}
            />
          </DrawerBody>
        </DrawerContent>
      </Portal>
    </DrawerRoot>
  );
};

export default CreateNoteDrawer;