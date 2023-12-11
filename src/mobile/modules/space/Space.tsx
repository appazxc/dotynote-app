import React from 'react';

import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
  RouterProvider,
} from 'react-router-dom';

import { openMainSpaceNote } from 'shared/actions/space/openMainSpaceNote';
import { queries } from 'shared/api/queries';
import { ContentLoader } from 'shared/components/ContentLoader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/space/helpers/useTabRouter';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import {
  selectActiveTab,
  selectActiveSpaceId,
} from 'shared/store/slices/appSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { invariant } from 'shared/util/invariant';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { ErrorPage } from 'mobile/modules/space/components/pages/ErrorPage';

import { ErrorTab } from 'mobile/modules/space/tabs/error/ErrorTab';
import { Home } from 'mobile/modules/space/tabs/home/Home';
import { LoadingTab } from 'mobile/modules/space/tabs/loading/LoadingTab';
import { tabsDictionary } from 'mobile/modules/space/tabs/tabsDictionary';

import { SpaceLayout } from './components/SpaceLayout/SpaceLayout';

function Space() {
  const activeTab = useAppSelector(selectActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const dispatch = useAppDispatch();

  invariant(activeSpaceId, 'activeSpaceId is empty');

  const {
    isError: tabNotesIsError,
    isFetched: tabNotesIsFetched,
  } = useQuery(queries.notes.tabNotes(activeSpaceId));

  React.useEffect(() => {
    if (!activeTab || !activeTab.routes.length) {
      dispatch(openMainSpaceNote());
    }
  }, [dispatch, activeTab]);

  if (tabNotesIsError) {
    return <ErrorPage />;
  }

  if (!tabNotesIsFetched) {
    return <ContentLoader />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return null;
  }

  if (activeTab.isFake) {
    return (
      <SpaceLayout>
        <Box
          w="full"
          h="full"
          display="flex"
          flexDirection="column"
        >
          <Box flexGrow="1">
            <ContentLoader />
          </Box>
          <Box flexShrink="0">
            <FooterNavigation />
          </Box>
        </Box>
      </SpaceLayout>
    );
  }

  return (
    <TabProvider tab={activeTab}>
      <SpaceLayout>
        <SpaceTabContent activeTab={activeTab} />
      </SpaceLayout>
    </TabProvider>

  );
}

function SpaceTabContent({ activeTab }: { activeTab: SpaceTabEntity }) {
  const router = useTabRouter(
    activeTab,
    tabsDictionary,
    {
      notFoundPage: <Home />,
      errorPage: <ErrorTab />,
      loadingPage: <LoadingTab />,
    }
  );

  return (
    <RouterProvider
      key={activeTab.id}
      router={router}
      fallbackElement={<ContentLoader />}
    />
  );
}

export { Space };
