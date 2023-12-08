import React from 'react';
import {
  RouterProvider,
} from 'react-router-dom';
import { useAppSelector } from 'shared/store/hooks';
import {
  selectActiveSpaceActiveTab,
  selectActiveSpaceId,
} from 'shared/store/slices/appSlice';
import { useQuery } from '@tanstack/react-query';

import { useTabRouter } from 'shared/modules/space/helpers/useTabRouter';
import { ErrorPage } from 'mobile/modules/space/components/pages/ErrorPage';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { SpaceLayout } from './components/SpaceLayout/SpaceLayout';
import { ContentLoader } from 'shared/components/ContentLoader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { queries } from 'shared/api/queries';
import { invariant } from 'shared/util/invariant';
import { ErrorTab } from 'mobile/modules/space/tabs/error/ErrorTab';
import { LoadingTab } from 'mobile/modules/space/tabs/loading/LoadingTab';
import { HomeTab } from 'mobile/modules/space/tabs/home/HomeTab';
import { tabsDictionary } from 'mobile/modules/space/tabs/tabsDictionary';
import { Box } from '@chakra-ui/react';
import { FooterNavigation } from 'mobile/containers/FooterNavigation';

function Space() {
  const activeTab = useAppSelector(selectActiveSpaceActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);

  invariant(activeSpaceId, 'activeSpaceId is empty');

  const { 
    // isLoading: tabNotesIsLoading, 
    isError: tabNotesIsError,
    isFetched: tabNotesIsFetched,
  } = useQuery(queries.notes.tabNotes(activeSpaceId));

  if (tabNotesIsError) {
    return <ErrorPage />;
  }

  if (!tabNotesIsFetched) {
    return <ContentLoader />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return (
      <SpaceLayout>
        no active tab
      </SpaceLayout>
    );
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
      notFoundPage: <HomeTab />,
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
