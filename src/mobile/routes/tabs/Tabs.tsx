import React from 'react';

import { Box, Button, Center, IconButton, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { LayoutGroup, motion } from 'framer-motion';
import { BsPlus } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

import { closeTab } from 'shared/actions/space/closeTab';
import { openTab } from 'shared/actions/space/openTab';
import { options } from 'shared/api/options';
import { Loader } from 'shared/components/Loader';
import { useTabTitle } from 'shared/hooks/useTabTitle';
import { SpaceTabTitle } from 'shared/modules/space/components/SpaceTabTitle';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { selectActiveTabId } from 'shared/selectors/tab/selectActiveTabId';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateActiveTabId } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
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
      layout
      as={motion.div}
      p="4"
      position="relative"
      border="2px solid"
      borderColor={borderColor}
      borderRadius="md"
      display="flex"
      alignItems="flex-end"
      justifyContent="space-between"
      w="full"
      cursor="pointer"
      gap="4"
      onClick={handleTabChange}
    >
      <Box overflow="hidden">
        <SpaceTabTitle
          title={tabTitle}
          fontSize="lg"
          fontWeight="500"
          textOverflow="ellipsis"
          noOfLines={1}
          display="block"
        />
      </Box>
      <IconButton
        icon={<MdClose /> }
        aria-label="close"
        size="xs"
        colorScheme="gray"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          dispatch(closeTab(id));
        }}
      />
    </Box>
  );
};

const Tabs = () => {
  const tabs = useAppSelector(selectSortedTabs);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeTabId = useAppSelector(selectActiveTabId);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);

  invariant(activeSpaceId, 'activeSpaceId is missings');

  const {
    isLoading: tabNotesIsLoading,
  } = useQuery({
    ...options.notes.tabNotes(activeSpaceId, router),
    throwOnError: true,
  });

  const renderedHeader = React.useMemo(() => {
    return (
      <LayoutHeader 
        title="Tabs"
        right={(
          <Box pr="2">
            <Button
              size="sm"
              variant="ghost"
              leftIcon={<BsPlus size="22px" />}
              onClick={() => {
                dispatch(openTab({ active: true }));
                navigate({ to: '/app' });
              }}
            >
            New tab
            </Button>
          </Box>
        )}
      />
    );
  }, [dispatch, navigate]);
  
  const renderedContent = React.useMemo(() => {
    if (tabNotesIsLoading) {
      return <Loader />;
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
    </Layout>
  );
};

export default Tabs;