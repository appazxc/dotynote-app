import React from 'react';

import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';
import { FaA } from 'react-icons/fa6';

import { RwButton } from 'shared/modules/noteTab/components/RwButton';
import { RwMode, rwModes } from 'shared/modules/noteTab/constants';
import { useTabContext } from 'shared/modules/space/components/TabProvider';
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
        icon: <BsArrowLeft />,
        onClick: () => history.back(),
        isDisabled: tab.routes.length <= 1,
      },
      ...showAddTo ? [{
        id: 'Add',
        label: 'Add',
        children: (
          <SidebarPlusMenu
            key={id}
            noteId={id}
            canAddToNote={canAddToNote}
            canAddToPosts={canAddToPosts}
          />
        ),
      }] : [],
      ...showRwMode ? [{
        element: (
          <RwButton
            key="NodeRw"
            rwMode={rwMode}
            tooltip={{
              label: 'Note read/edit',
              openDelay:300,
              placement:'right',
              backgroundColor:'black',
              hasArrow: true,
            }}
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
    return items.map(({ id, label = '', element, children, ...restItem }) => {
      return element || (
        <Tooltip
          key={id}
          hasArrow
          label={label}
          openDelay={300}
          placement="right"
          backgroundColor="black"
        >
          {children || (
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
