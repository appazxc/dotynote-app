import { Box, IconButton } from '@chakra-ui/react';
import { BsArrowLeft } from 'react-icons/bs';
import { FaPencil } from 'react-icons/fa6';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { useNavigate } from 'react-router';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

import { TabSidebar } from 'desktop/modules/space/components/TabLayout';
import { RwMode, rwModes } from 'desktop/modules/space/tabs/note/constants';

type Props = {
  rwMode: RwMode,
  toggleRwMode: () => void,
}

export const NoteSidebar = (props: Props) => {
  const { rwMode, toggleRwMode } = props;
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
        {rwMode !== rwModes.NONE && (
          <IconButton
            size="sm"
            aria-label="Note write"
            icon={rwMode === rwModes.READ ? <FaPencil /> : <HiOutlineBookOpen size="18" />}
            onClick={toggleRwMode}
            variant="ghost"
          />
        )}
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
