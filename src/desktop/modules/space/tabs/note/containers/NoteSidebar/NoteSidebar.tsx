import { Box, IconButton } from '@chakra-ui/react';
import { TabSidebar } from 'desktop/modules/space/components/TabLayout';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { BsArrowLeft } from 'react-icons/bs';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

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
