import { Box, IconButton, IconButtonProps } from '@chakra-ui/react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import React from 'react';
import { BsArrowLeft, BsFillPinAngleFill } from 'react-icons/bs';
import { FaA } from 'react-icons/fa6';
import { IoSearchSharp } from 'react-icons/io5';

import { usePinnedPostsCount } from 'shared/api/hooks/usePinnedPostsCount';
import { Tooltip } from 'shared/components/ui/tooltip';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { RwButton } from 'shared/modules/noteTab/components/RwButton';
import { RwMode, rwModes } from 'shared/modules/noteTab/constants';
import { useTabContext } from 'shared/modules/space/components/TabProvider';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleAdvancedEdit, toggleSearch } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import { TabSidebar } from 'desktop/modules/space/components/TabSidebar';

import { SidebarFooter } from './SidebarFooter';
import { SidebarPlusMenu } from './SidebarPlusMenu';

type Props = {
  note: NoteEntity,
  rwMode: RwMode,
  showRwMode: boolean,
  showSearch: boolean,
}

export const NoteSidebar = React.memo((props: Props) => {
  const { note: { id: noteId, settings: noteSettings, permissions }, rwMode, showRwMode, showSearch } = props;
  const { history } = useRouter();
  const dispatch = useAppDispatch();
  const tab = useTabContext();
  const navigate = useNavigate();
  const { isAdvancedEditActive, isSearchActive } = useAppSelector(state => state.app.note);
  const lastIsSearchActive = React.useRef(isSearchActive);
  const { data: pinnedPostsCount } = usePinnedPostsCount(noteId);
  const showAddTo = permissions.update || permissions.createPost;
  const isNoteContentVisible = !noteSettings?.hide;

  React.useEffect(() => {
    lastIsSearchActive.current = isSearchActive;
  }, [isSearchActive]);

  React.useEffect(() => () => {
    if (lastIsSearchActive.current) {
      dispatch(toggleSearch());
    }
  }, [dispatch, noteId, tab.id]);

  const items = React.useMemo(() => {
    return [
      {
        id: 'Note back',
        label: 'Back',
        icon: <BsArrowLeft />,
        onClick: () => history.back(),
        disabled: tab.routes.length <= 1,
      },
      ...showAddTo ? [{
        id: 'Add',
        label: 'Add',
        children: (
          <SidebarPlusMenu
            key={noteId}
            noteId={noteId}
            canAddToNote={permissions.update}
            canAddToPosts={permissions.createPost}
          />
        ),
      }] : [],
      ...showRwMode && isNoteContentVisible ? [{
        element: (
          <RwButton
            key="NodeRw"
            rwMode={rwMode}
            tooltip={{
              content: 'Note read/edit',
              openDelay:300,
              positioning: { placement:'right' },
              contentProps: { backgroundColor:'black' },
              showArrow: true,
            }}
          />
        ),
      }] : [],
      ...showRwMode && rwMode === rwModes.WRITE && isNoteContentVisible ? [{
        id: 'Advanced edit',
        label: 'Advanced edit',
        icon: <FaA />,
        onClick: () => dispatch(toggleAdvancedEdit()),
        variant: isAdvancedEditActive ? 'subtle' : 'ghost',
      }] : [],
      ...showSearch ? [{
        id: 'Search',
        label: 'Search',
        icon: <IoSearchSharp size="18" />,
        onClick: () => dispatch(toggleSearch()),
        variant: isSearchActive ? 'subtle' : 'ghost',
      }] : [],
      ...pinnedPostsCount ? [{
        id: 'Pinned posts',
        label: 'Pinned posts',
        icon: <BsFillPinAngleFill />,
        onClick: () => navigate({ to: `${noteRoutePath}/pinned`, params: { noteId } }),
      }] : [],
    ];
  }, [
    pinnedPostsCount,
    navigate,
    rwMode,
    noteId,
    showAddTo,
    showSearch,
    history,
    dispatch,
    isAdvancedEditActive,
    showRwMode,
    tab.routes.length,
    isSearchActive,
    isNoteContentVisible,
  ]);

  const renderedItems = React.useMemo(() => {
    return items.map(({ id, label = '', element, icon, children, ...restItem }) => {
      return element || (
        <Tooltip
          key={id}
          showArrow
          content={label}
          openDelay={1000}
          closeDelay={100}
          positioning={{ placement: 'right' }}
          contentProps={{ backgroundColor: 'black' }}
        >
          {children || (
            <IconButton
              size="xs"
              variant="ghost"
              iconSize="auto"
              position="relative"
              aria-label={label}
              {...restItem as IconButtonProps}
            >{icon}</IconButton>
          )}
        </Tooltip>
      );
    });
  }, [items]);

  return (
    <TabSidebar footer={<SidebarFooter noteId={noteId} />}>
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
