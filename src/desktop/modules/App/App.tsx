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

import { useAppRouter } from './routes/useAppRouter';
import { ErrorPage } from './routes/error/ErrorPage';
import { LoadingPage } from './routes/loading/LoadingPage';
import { HomePage } from './routes/home/HomePage';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { AppLayout } from './components/AppLayout';

function App() {
  const dispatch = useAppDispatch();
  const appSession = useAppSelector(selectAppSession);
  const activeTab = useAppSelector(selectActiveSpaceActiveTab);

  const { isLoading: spaceIsLoading, isError: spaceError } = useQuery({
    queryKey: ['space', appSession?.activeSpaceId],
    queryFn: () => dispatch(fetchUserSpace(appSession?.activeSpaceId)),
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
    return <HomePage />;
  }

  return (
    <AppLayout>
      <AppEntry activeTab={activeTab} />
    </AppLayout>
  );
}

function AppEntry({ activeTab }: { activeTab: SpaceTabEntity }) {
  const router = useAppRouter(activeTab);
  const routerProvider = <RouterProvider router={router} />;
console.log('routerProvider', routerProvider);

  return routerProvider;
}

export { App };
