import { Flex, Portal, Text } from '@chakra-ui/react';

import { Loader } from 'shared/components/Loader';
import { DrawerBackdrop, DrawerBody, DrawerContent, DrawerHeader, DrawerRoot } from 'shared/components/ui/drawer';
import { useCreateNoteItems } from 'shared/hooks/useCreateNoteItems';
import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { ContentPickerCards } from 'shared/modules/noteTab/components/ContentPicker/ContentPickerCards';
import { useAppDispatch } from 'shared/store/hooks';
import { OpenChangeDetails } from 'shared/types/drawer';

export type Props = {
  onCreate: (noteId: string) => void;
  onError?: (error: unknown) => void;
}

const CreateNoteDrawer = ({ onCreate, onError }: Props) => {
  const dispatch = useAppDispatch();
  
  const handleClose = () => {
    dispatch(hideDrawer());
  };

  const handleOpenChange = (details: OpenChangeDetails) => {
    if (!details.open) {
      handleClose();
    }
  };
  
  const { items, isLoading } = useCreateNoteItems({ 
    onCreate, 
    onError,
    onClick: () => {
      dispatch(hideDrawer());
    }, 
  });

  return (
    <DrawerRoot
      open
      placement="bottom"
      onOpenChange={handleOpenChange}
    >
      <Portal>
        <DrawerBackdrop />
        <DrawerContent roundedTop="2xl">
          <DrawerHeader
            pb="1"
            pt="4"
            justifyContent="center"
          >
            <Flex
              alignItems="center"
              gap="2"
            >
              <Text fontSize="md" fontWeight="500">Create note</Text> 
            </Flex>
          </DrawerHeader>
          <DrawerBody pt="1">  
            {isLoading ? <Loader height="200px" /> : <ContentPickerCards view="list" items={items} />}
          </DrawerBody>
        </DrawerContent>
      </Portal>
    </DrawerRoot>
  );
};

export default CreateNoteDrawer;