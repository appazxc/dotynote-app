import { Box, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from '@chakra-ui/react';

import { ContentLoader } from 'shared/components/ContentLoader';
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
      <Drawer
        isOpen
        onClose={() => dispatch(hideDrawer())}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Box p="4">
              <ContentLoader delay={0} />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Wait>
  );
};
