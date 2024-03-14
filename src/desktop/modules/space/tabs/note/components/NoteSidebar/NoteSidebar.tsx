import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { BsArrowLeft, BsPlus } from 'react-icons/bs';
import { FaPencil } from 'react-icons/fa6';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { useNavigate } from 'react-router';

import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { IdentityType } from 'shared/types/entities/BaseEntity';

import { TabSidebar } from 'desktop/modules/space/components/TabLayout';
import { RwMode, rwModes } from 'desktop/modules/space/tabs/note/constants';
import { useNoteTabId } from 'desktop/modules/space/tabs/note/hooks/useNoteTabId';

import { SidebarFooter } from './SidebarFooter';
import { SidebarPlusMenu } from './SidebarPlusMenu';

type Props = {
  id: IdentityType,
  rwMode: RwMode,
  toggleRwMode: () => void,
}

export const NoteSidebar = (props: Props) => {
  const { id, rwMode, toggleRwMode } = props;
  const navigate = useNavigate();
  const tab = useTabContext();
  useNoteTabId();

  const items = React.useMemo(() => {
    return [
      {
        label: 'Note back',
        icon: <BsArrowLeft />,
        onClick: () => navigate(-1),
        isDisabled: tab.routes.length <= 1,
      },
      {
        label: 'Note add',
        element: <SidebarPlusMenu key={id} noteId={id} />,
      },
      ...rwMode !== rwModes.NONE ? [{
        label: 'Note write',
        icon: rwMode === rwModes.READ ? <FaPencil /> : <HiOutlineBookOpen size="18" />,
        onClick: toggleRwMode,
      }] : [],
    ];
  }, [rwMode, id, navigate, tab.routes.length, toggleRwMode]);

  return (
    <TabSidebar footer={<SidebarFooter id={id} />}>
      <Box
        gap="2"
        display="flex"
        flexDirection="column"
        p="2"
      >
        {items.map(({ label, element, ...restItem }) => 
          element || (
            <IconButton
              key={label}
              size="sm"
              variant="ghost"
              aria-label={label}
              {...restItem}
            />
          ))}
      </Box>
    </TabSidebar>
  );
};
