import { Box, Button, Card, Stack } from '@chakra-ui/react';
import { Layout, LayoutHeader } from 'mobile/components/Layout';
import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { createTab } from 'shared/actions/space/createTab';
import { routeNames } from 'shared/constants/routeNames';
import { SpaceTabTitle } from 'shared/containers/SpaceTabTitle';
import { tabNames } from 'shared/modules/space/constants/tabNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { changeActiveTab, selectSortedSpaceTabs } from 'shared/store/slices/appSlice';
import { buildUrl } from 'shared/util/router/buildUrl';

const Tab = ({ id }) => {
  const spaceTab = useAppSelector(state => spaceTabSelector.getById(state, id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleTabChange = React.useCallback(() => {
    if (!spaceTab) return;

    dispatch(changeActiveTab(spaceTab.id));
    navigate(buildUrl({ routeName: routeNames.app }));
  }, [dispatch, spaceTab, navigate]);


  if (!spaceTab) {
    return null;
  }

  return (
    <Card
      px="4"
      py="2"
      onClick={handleTabChange}
      cursor="pointer"
    >
      <SpaceTabTitle path={spaceTab.routes[spaceTab.routes.length - 1]} />
    </Card>
  );
};

export const Tabs = () => {
  const tabIds = useAppSelector(selectSortedSpaceTabs);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const renderedHeader = React.useMemo(() => {
    const rightSide = (
      <Box pr="4" py="1">
        <Button
          size="xs"
          leftIcon={<BsPlus size="22px" />}
          onClick={() => {
            dispatch(createTab({ makeActive: true }));
            navigate(buildUrl({ routeName: routeNames.app }));
          }}
        >
          New tab
        </Button>
      </Box>
    );

    return (
      <LayoutHeader 
        right={rightSide}
      >
        TabsPage
      </LayoutHeader>
    );
  }, [dispatch, navigate]);
  
  return (
    <Layout 
      header={renderedHeader}
    >
      <Stack p="4" gap="4">
        {tabIds.map((id) => <Tab key={id} id={id} />)}
      </Stack>
    </Layout>
  );
};
