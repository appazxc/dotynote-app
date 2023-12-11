import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

import { TabSidebar } from 'desktop/modules/space/components/TabLayout';

export const NoteSidebar = () => {
  const { noteId = "" } = useParams();
  const navigate = useNavigate();
  const tab = useTabContext();

  return (
    <TabSidebar>
      <Box
        gap="2"
        display="flex"
        flexDirection="column"
        p="2"
      >
        <IconButton
          size="sm"
          aria-label="Note back"
          icon={<BsArrowLeft />}
          onClick={() => navigate(-1)}
          isDisabled={tab.routes.length <= 1}
          variant="ghost"
        />
        <IconButton
          size="sm"
          aria-label="Note menu"
          variant="ghost"
          icon={<PiDotsSixVerticalBold />}
        />
      </Box>
    </TabSidebar>
  );
};
