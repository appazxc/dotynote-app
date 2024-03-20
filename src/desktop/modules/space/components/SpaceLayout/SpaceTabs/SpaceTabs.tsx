import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { motion, LayoutGroup } from 'framer-motion';
import { BsPlus } from 'react-icons/bs';

import { openTab } from 'shared/actions/space/openTab';
import { useSpaceTabs } from 'shared/api/hooks/useSpaceTabs';
import { ChakraBox } from 'shared/components/ChakraBox';
import { useAppDispatch } from 'shared/store/hooks';

import { SpaceTab } from './SpaceTab';

export const SpaceTabs = React.memo(() => {
  const { data: tabIds } = useSpaceTabs({ sorted: true });
  const dispatch = useAppDispatch();
 
  const handlePlusClick = React.useCallback(() => {
    dispatch(openTab({ makeActive: true }));
  }, [dispatch]);
  
  return (
    <Box
      as={motion.div}
      display="flex"
      layout
      flexDirection="row"
      gap="1"
      flexGrow="1"
    >
      <LayoutGroup>
        {tabIds && tabIds.map((id, index) => (
          <SpaceTab
            key={id}
            id={id}
            isLast={tabIds.length === index + 1}
          />
        ))}
        <ChakraBox layout>
          <IconButton
            size="sm"
            aria-label="Add"
            icon={<BsPlus size="22px" />}
            borderRadius="full"
            variant="ghost"
            onClick={handlePlusClick}
          />
        </ChakraBox>
      </LayoutGroup>
    </Box>
  );
});
