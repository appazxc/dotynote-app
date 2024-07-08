import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';
import { FaA, FaPencil } from 'react-icons/fa6';
import { HiOutlineBookOpen } from 'react-icons/hi';

import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { RwMode, rwModes } from 'shared/modules/space/tabs/note/constants';
import { selectCanAddToNote } from 'shared/selectors/user/selectCanAddToNote';
import { selectCanAddToPosts } from 'shared/selectors/user/selectCanAddToPosts';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleAdvancedEdit, toggleRwMode } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';

import { TabSidebar } from 'desktop/modules/space/components/TabLayout';

import { SidebarFooter } from './SidebarFooter';
import { SidebarPlusMenu } from './SidebarPlusMenu';

type Props = {
  id: IdentityType,
  rwMode: RwMode,
  showRwMode: boolean,
}

export const NoteSidebar = React.memo((props: Props) => {
  const { id, rwMode, showRwMode } = props;
  const { history } = useRouter();
  const dispatch = useAppDispatch();
  const tab = useTabContext();
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);
  const canAddToNote = useAppSelector(state => selectCanAddToNote(state, { noteId: id }));
  const canAddToPosts = useAppSelector(state => selectCanAddToPosts(state, { noteId: id }));
  const showAddTo = canAddToNote || canAddToPosts;

  const items = React.useMemo(() => {
    return [
      {
        label: 'Note back',
        icon: <BsArrowLeft />,
        onClick: () => history.back(),
        isDisabled: tab.routes.length <= 1,
      },
      ...showAddTo ? [{
        label: 'Note add',
        element: <SidebarPlusMenu
          key={id}
          noteId={id}
          canAddToNote={canAddToNote}
          canAddToPosts={canAddToPosts}
        />,
      }] : [],
      ...showRwMode ? [{
        label: 'Note write',
        icon: rwMode === rwModes.READ ? <FaPencil /> : <HiOutlineBookOpen size="18" />,
        onClick: () => dispatch(toggleRwMode()),
      }] : [],
      ...showRwMode && rwMode === rwModes.WRITE ? [{
        label: 'Advanced edit',
        icon: <FaA />,
        onClick: () => dispatch(toggleAdvancedEdit()),
        variant: isAdvancedEditActive ? 'outline' : 'ghost',
        colorScheme: isAdvancedEditActive ? 'brand' : 'gray',
      }] : [],
    ];
  }, [
    rwMode,
    id,
    showAddTo,
    canAddToNote,
    canAddToPosts,
    history,
    dispatch,
    isAdvancedEditActive,
    showRwMode,
    tab.routes.length,
  ]);

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
});
