import { Box } from '@chakra-ui/react';

import { Loader } from 'shared/components/Loader';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerRoot,
} from 'shared/components/ui/drawer';
import { Wait } from 'shared/components/Wait';
import { useAppDispatch } from 'shared/store/hooks';

import { hideDrawer } from './drawerSlice';

type Props = {
  delay?: number,
}

export const DrawerLoader = ({ delay }: Props) => {
  const dispatch = useAppDispatch();
  
  return (
    <Wait delay={delay ?? 300}>
      <DrawerRoot
        open
        onOpenChange={() => dispatch(hideDrawer())}
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerBody>
            <Box p="4">
              <Loader delay={0} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </Wait>
  );
};
