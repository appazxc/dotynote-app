import React from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useTabContext } from '../../TabProvider';
import { getTabInfo } from 'desktop/modules/app/helpers/tabHelpers';

export const SpaceNoteMenu = () => {
  const showNoteMenu = false;
  const tab = useTabContext();

  const { match, isNoteTab, noteId } = React.useMemo(() => {
    return getTabInfo(tab.routes[tab.routes.length - 1]);
  }, [tab]);
  
  return (
    isNoteTab
      ? (
        <Box
          borderRadius="md"
          border="1px solid"
          borderColor="gray.6"
          h="8"
          px="2"
          display="flex"
          alignItems="center"
        >
          <IconButton
            size="xs"
            aria-label="Note menu"
            icon={<BsThreeDotsVertical />}
          />
        </Box>
      )
      : null
  );
};
