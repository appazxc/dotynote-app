import React from 'react';

import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';
import { FaA } from 'react-icons/fa6';

import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { RwButton } from 'shared/modules/space/tabRoutes/note/components/RwButton';
import { RwMode, rwModes } from 'shared/modules/space/tabRoutes/note/constants';
import { selectCanAddToNote } from 'shared/selectors/user/selectCanAddToNote';
import { selectCanAddToPosts } from 'shared/selectors/user/selectCanAddToPosts';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleAdvancedEdit } from 'shared/store/slices/appSlice';

import { TabSidebar } from 'desktop/modules/space/components/TabLayout';

import { SidebarFooter } from './SidebarFooter';
import { SidebarPlusMenu } from './SidebarPlusMenu';

type Props = {
  id: number,
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
        id: 'Note back',
        label: 'Note back',
        icon: <BsArrowLeft />,
        onClick: () => history.back(),
        isDisabled: tab.routes.length <= 1,
      },
      ...showAddTo ? [{
        id: 'Add',
        label: 'Add',
        element: (
          <SidebarPlusMenu
            key={id}
            noteId={id}
            canAddToNote={canAddToNote}
            canAddToPosts={canAddToPosts}
          />
        ),
      }] : [],
      ...showRwMode ? [{
        id: 'NodeRw',
        label: rwMode === rwModes.READ ? 'Note edit' : 'Note read',
        element: (
          <RwButton
            rwMode={rwMode}
            label={rwMode === rwModes.READ ? 'Note edit' : 'Note read'}
          />
        ),
      }] : [],
      ...showRwMode && rwMode === rwModes.WRITE ? [{
        id: 'Advanced edit',
        label: 'Advanced edit',
        icon: <FaA />,
        onClick: () => dispatch(toggleAdvancedEdit()),
        variant: isAdvancedEditActive ? 'solid' : 'ghost',
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

  const renderedItems = React.useMemo(() => {
    return items.map(({ id, label, element, ...restItem }) => {
      return (
        <Tooltip
          key={id}
          label={label}
          openDelay={300}
          placement="right"
          backgroundColor="black"
          hasArrow
        >
          {element || (
            <IconButton
              size="sm"
              variant="ghost"
              position="relative"
              aria-label={label}
              {...restItem}
            />
          )}
        </Tooltip>
      );
    });
  }, [items]);

  return (
    <TabSidebar footer={<SidebarFooter id={id} />}>
      <Box
        gap="1.5"
        display="flex"
        flexDirection="column"
        p="2"
      >
        {renderedItems}
      </Box>
    </TabSidebar>
  );
});
