import React from 'react';

import { Box, Button, Card, IconButton, Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { LayoutGroup, motion } from 'framer-motion';
import { BsPlus } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

import { closeTab } from 'shared/actions/space/closeTab';
import { openTab } from 'shared/actions/space/openTab';
import { useSpaceTabs } from 'shared/api/hooks/useSpaceTabs';
import { options } from 'shared/api/options';
import { Loader } from 'shared/components/Loader';
import { useTabTitle } from 'shared/hooks/useTabTitle';
import { SpaceTabTitle } from 'shared/modules/space/components/SpaceTabTitle';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { selectActiveTabId } from 'shared/selectors/tab/selectActiveTabId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateActiveTabId } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { router } from 'mobile/modules/space/tabRoutes/router';

const Tab = ({ id, isActive }) => {
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  invariant(spaceTab, 'Tab is missing');

  const tabTitle = useTabTitle(spaceTab.routes[spaceTab.routes.length - 1], router);
  const handleTabChange = React.useCallback(() => {
    if (!spaceTab) return;

    dispatch(updateActiveTabId(spaceTab.id));
    navigate({ to: '/app' });
  }, [dispatch, spaceTab, navigate]);

  if (!spaceTab) {
    return null;
  }

  return (
    <Card
      as={motion.div}
      layout
      px="3"
      py="1"
      onClick={handleTabChange}
      cursor="pointer"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      gap="2"
      variant="filled"
      bg={isActive ? 'gray.300' : 'gray.100'}
    >
      <Box overflow="hidden">
        <SpaceTabTitle title={tabTitle} />
      </Box>
      <IconButton
        icon={<MdClose /> }
        aria-label="close"
        size="sm"
        variant="unstyled"
        display="inline-flex"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          dispatch(closeTab(id));
        }}
      />
    </Card>
  );
};

export const Tabs = () => {
  const tabs = useSpaceTabs({ sorted: true });
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
    const rightSide = (
      <Box pr="2">
        <Button
          size="sm"
          leftIcon={<BsPlus size="22px" />}
          onClick={() => {
            dispatch(openTab({ makeActive: true }));
            navigate({ to: '/app' });
          }}
        >
          New tab
        </Button>
      </Box>
    );

    return (
      <LayoutHeader 
        right={rightSide}
      />
    );
  }, [dispatch, navigate]);
  
  if (tabNotesIsLoading) {
    return <Loader delay={300} />;
  }
  
  return (
    <Layout 
      header={renderedHeader}
      footer={
        <FooterNavigation />
      }
    >
      <LayoutGroup>
        <Stack
          p="4"
          gap="2"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              id={tab.id}
              isActive={tab.id === activeTabId}
            />
          ))}
        </Stack>
      </LayoutGroup>

    </Layout>
  );
};
