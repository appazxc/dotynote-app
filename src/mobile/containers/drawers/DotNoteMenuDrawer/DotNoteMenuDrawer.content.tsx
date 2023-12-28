import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';

import { hideDrawer } from 'shared/modules/drawer/drawerSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  noteId: string,
}

const DotNoteMenuDrawer = (props: Props) => {
  const { noteId } = props;
  const dispatch = useAppDispatch();
  
  return (
    <Drawer
      isOpen
      placement="bottom"
      onClose={() => dispatch(hideDrawer())}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody py="6">
          daskjdksadsa 
          das d
          async  
            das
             d
             as 
             daskjdksadsa 
          das d
          async  
            das
             d
             as  daskjdksadsa 
          das d
          async  
            das
             d
             as  daskjdksadsa 
          das d
          async  
            das
             d
             as  daskjdksadsa 
          das d
          async  
            das
             d
             as  daskjdksadsa 
          das d
          async  
            das
             d
             as  daskjdksadsa 
          das d
          async  
            das
             d
             as  daskjdksadsa 
          das d
          async  
            das
             d
             as  daskjdksadsa 
          das d
          async  
            das
             d
             as  daskjdksadsa 
          das d
          async  
            das
             d
             as 
          
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DotNoteMenuDrawer;