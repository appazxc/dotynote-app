import React from 'react';
import {
  RouterProvider,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import {
  fetchSpaceTabs,
  fetchUserSpace,
  fetchSpaceTabsRouteNotes,
  selectActiveSpaceActiveTab,
  selectAppSession
} from 'shared/store/slices/appSlice';
import { useQuery } from '@tanstack/react-query';
import { NotFoundPage } from 'desktop/routes/NotFound';

import { useAppRouter } from './tabs/useTabs';
import { ErrorPage } from './tabs/error/ErrorPage';
import { LoadingPage } from './tabs/loading/LoadingPage';
import { HomeTab } from './tabs/home/HomeTab';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { SpaceLayout } from './components/SpaceLayout';
import ContentLoader from 'shared/components/ContentLoader';
import { TabProvider } from './components/TabProvider';

function App() {
  const dispatch = useAppDispatch();
  const appSession = useAppSelector(selectAppSession);
  const activeTab = useAppSelector(selectActiveSpaceActiveTab);

  const { isLoading: spaceIsLoading, isError: spaceError } = useQuery({
    queryKey: ['space', appSession?.activeSpaceId],
    queryFn: () => {
      return dispatch(fetchUserSpace(appSession?.activeSpaceId));
    },
    enabled: !!appSession,
  });

  const { isLoading: spaceTabsIsLoading, isError: spaceTabsError, isFetched } = useQuery({
    queryKey: ['spaceTabs', appSession?.activeSpaceId],
    queryFn: () => dispatch(fetchSpaceTabs(appSession?.activeSpaceId)),
    enabled: !!appSession,
  });

  const { isLoading: tabNotesIsLoading, isError: tabNotesError } = useQuery({
    queryKey: ['spaceTabNotes', appSession?.activeSpaceId],
    queryFn: () => dispatch(fetchSpaceTabsRouteNotes(appSession?.activeSpaceId as string)),
    enabled: isFetched,
  });

  if (!appSession) {
    return <NotFoundPage />;
  }

  if (spaceError || spaceTabsError || tabNotesError) {
    return <ErrorPage />;
  }

  if (spaceIsLoading || spaceTabsIsLoading || tabNotesIsLoading) {
    return <LoadingPage />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return <HomeTab />;
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

export { App };
