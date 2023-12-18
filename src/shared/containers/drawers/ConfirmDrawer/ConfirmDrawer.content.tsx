import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerBody,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react';

import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  title: string,
  description: string,
  onConfirm: () => void,
}

const ConfirmDrawer = (props: Props) => {
  const { title, description, onConfirm } = props;
  const dispatch = useAppDispatch();
  
  return (
    <Drawer
      isOpen
      onClose={() => dispatch(hideDrawer())}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          {description}
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="brand"
            variant="ghost"
            mr={3}
            onClick={() => dispatch(hideDrawer())}
          >
              Close
          </Button>
          <Button colorScheme="brand" onClick={onConfirm}>Confirm</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ConfirmDrawer;