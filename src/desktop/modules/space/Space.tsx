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
import { ErrorPage } from 'desktop/modules/space/components/pages/ErrorPage';
import { LoadingPage } from 'desktop/modules/space/components/pages/LoadingPage';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { SpaceLayout } from 'desktop/modules/space/components/SpaceLayout';
import { ContentLoader } from 'shared/components/ContentLoader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { queries } from 'shared/api/queries';
import { invariant } from 'shared/util/invariant';
import { ErrorTab } from 'desktop/modules/space/tabs/error/ErrorTab';
import { LoadingTab } from 'desktop/modules/space/tabs/loading/LoadingTab';
import { HomeTab } from 'desktop/modules/space/tabs/home/HomeTab';
import { tabsDictionary } from 'desktop/modules/space/tabs/tabsDictionary';

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
    return <LoadingPage />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return (
      <SpaceLayout>
        no active tab
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
