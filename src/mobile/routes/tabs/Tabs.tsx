import { Box, Button, Center, Stack, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { LayoutGroup, motion } from 'motion/react';
import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

import { closeTab } from 'shared/actions/space/closeTab';
import { openTab } from 'shared/actions/space/openTab';
import { updateActiveTabId } from 'shared/actions/space/updateActiveTabId';
import { options } from 'shared/api/options';
import { Loader } from 'shared/components/Loader';
import { CloseButton } from 'shared/components/ui/close-button';
import { useColorModeValue } from 'shared/components/ui/color-mode';
import { drawerIds } from 'shared/constants/drawerIds';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { useTabTitle } from 'shared/hooks/useTabTitle';
import { hideDrawer, showDrawer } from 'shared/modules/drawer/drawerSlice';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { SpaceTabTitle } from 'shared/modules/space/components/SpaceTabTitle';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { selectActiveTabId } from 'shared/selectors/tab/selectActiveTabId';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { NoteContentPickerDrawer } from 'mobile/containers/drawers/NoteContentPickerDrawer';
import { buildTabHref } from 'mobile/modules/space/helpers/buildTabHref';
import { router } from 'mobile/modules/space/tabRoutes/router';

const Tab = ({ id, isActive }) => {
  const spaceTab = useAppSelector(state => spaceTabSelector.getEntityById(state, id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const borderColor = useColorModeValue(
    isActive ? 'gray.600' : 'gray.300', 
    isActive ? 'whiteAlpha.900' : 'whiteAlpha.100');

  invariant(spaceTab, 'Tab is missing');

  const tabTitle = useTabTitle(spaceTab.routes[spaceTab.routes.length - 1], router);

  const handleTabChange = React.useCallback(() => {
    dispatch(updateActiveTabId(spaceTab.id));
    navigate({ to: '/app' });
  }, [dispatch, spaceTab, navigate]);

  return (
    <Box
      asChild
      p="4"
      position="relative"
      border="2px solid"
      borderColor={borderColor}
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      cursor="pointer"
      gap="4"
      onClick={handleTabChange}
    >
      <motion.div layout>
        <Box overflow="hidden">
          <SpaceTabTitle
            title={tabTitle}
            fontSize="md"
            textOverflow="ellipsis"
            lineClamp={2}
            display="-webkit-box"
          />
        </Box>
        <CloseButton
          aria-label="close"
          size="xs"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            event.stopPropagation();
            dispatch(closeTab(id));
          }}
        ><MdClose /></CloseButton>
      </motion.div>
    </Box>
  );
};

const Tabs = () => {
  const tabs = useAppSelector(selectSortedTabs);
  const dispatch = useAppDispatch();
  const activeTabId = useAppSelector(selectActiveTabId);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const navigate = useNavigate();
  invariant(activeSpaceId, 'activeSpaceId is missings');

  const {
    isLoading: tabNotesIsLoading,
  } = useQuery({
    ...options.notes.tabNotes(activeSpaceId, router),
    throwOnError: true,
  });

  const handleCreateNote = React.useCallback((noteId) => {
    dispatch(openTab({ 
      route: buildTabHref({ to: noteRoutePath, params: { noteId: String(noteId) } }),
      active: true,
    }));
    navigate({ to: '/app' });
    dispatch(hideDrawer());
    dispatch(hideModal());
  }, [navigate, dispatch]);

  const handleError = React.useCallback(() => {
    dispatch(hideDrawer());
    dispatch(hideModal());
  }, [dispatch]);

  const renderedHeader = React.useMemo(() => {
    return (
      <LayoutHeader 
        title="Tabs"
        right={(
          <Box pr="2">
            <Button
              size="sm"
              variant="ghost"
              iconSize="auto"
              px="2"
              onClick={() => {
                dispatch(showDrawer({ id: drawerIds.noteContentPicker }));
              }}
            >
              <BsPlus size="22px" />
            </Button>
          </Box>
        )}
      />
    );
  }, [dispatch]);
  
  const renderedContent = React.useMemo(() => {
    if (tabNotesIsLoading) {
      return <Loader showRequests />;
    }

    if (!tabs.length) {
      return (
        <Center h="full">
          <Text color="gray.500">Create new tab</Text>
        </Center>
      );
    }

    return (
      <LayoutGroup>
        <Stack
          p="4"
          gap="2"
        >
          {tabs.slice().reverse().map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              isActive={tab.id === activeTabId}
            />
          ))}
        </Stack>
      </LayoutGroup>
    );
  }, [tabNotesIsLoading, tabs, activeTabId]);
  
  return (
    <Layout header={renderedHeader}>
      {renderedContent}
      <NoteContentPickerDrawer onCreate={handleCreateNote} onError={handleError} />
      <CreateNoteModal onCreate={handleCreateNote} onError={handleError} />
    </Layout>
  );
};

export default Tabs;