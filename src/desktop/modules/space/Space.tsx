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

import { useAppRouter } from './tabs/useTabs';
import { ErrorPage } from './tabs/error/ErrorPage';
import { LoadingPage } from './tabs/loading/LoadingPage';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { SpaceLayout } from './components/SpaceLayout';
import ContentLoader from 'shared/components/ContentLoader';
import { TabProvider } from './components/TabProvider';
import { queries } from 'shared/api/queries';
import { invariant } from 'shared/util/invariant';

function Space() {
  const activeTab = useAppSelector(selectActiveSpaceActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);

  invariant(activeSpaceId, 'activeSpaceId is empty');

  const { 
    // isLoading: spaceIsLoading, 
    isError: spaceIsError, 
    isFetched: spaceIsFetched,
  } = useQuery(queries.spaces.one(activeSpaceId));

  const { 
    // isLoading: tabNotesIsLoading, 
    isError: tabNotesIsError,
    isFetched: tabNotesIsFetched,
  } = useQuery(queries.notes.tabNotes(activeSpaceId));

  // когда нет активного спейса и нет спейсов

  if (spaceIsError || tabNotesIsError) {
    return <ErrorPage />;
  }

  if (!spaceIsFetched || !tabNotesIsFetched) {
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
  const router = useAppRouter(activeTab);

  return (
    <RouterProvider
      key={activeTab.id}
      router={router}
      fallbackElement={<ContentLoader />}
    />
  );
}

export { Space };
