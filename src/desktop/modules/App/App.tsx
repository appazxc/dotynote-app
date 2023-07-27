import React from 'react';
import {
  RouterProvider,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { fetchSpaceTabs, fetchUserSpace, selectAppSession } from 'shared/store/slices/appSlice';
import {
  useQuery,
} from '@tanstack/react-query';
import { NotFoundPage } from 'desktop/routes/NotFound';

import { AppErrorLayout, AppLoadingLayout } from './components/AppLayout';
import { useAppRouter } from './hooks/useAppRouter';

function App() {
  const appSession = useAppSelector(selectAppSession);
  const dispatch = useAppDispatch();

  const { isLoading: spaceIsLoading, isError: spaceError } = useQuery({
    queryKey: ['space', appSession?.activeSpaceId],
    queryFn: () => dispatch(fetchUserSpace(appSession?.activeSpaceId)),
    enabled: !!appSession,
  });

  const { isLoading: spaceTabsIsLoading, isError: spaceTabsError } = useQuery({
    queryKey: ['spaceTabs', appSession?.activeSpaceId],
    queryFn: () => dispatch(fetchSpaceTabs(appSession?.activeSpaceId)),
    enabled: !!appSession,
  });

  if (!appSession) {
    return <NotFoundPage />;
  }

  if (spaceError || spaceTabsError) {
    return <AppErrorLayout />;
  }

  if (spaceIsLoading || spaceTabsIsLoading) {
    return <AppLoadingLayout />;
  }

  return (
    <AppEntry activeSpaceTabId={appSession.activeSpaceTabId} />
  );
}

function AppEntry({ activeSpaceTabId }) {
  const router = useAppRouter(activeSpaceTabId);

  return <RouterProvider router={router} />;
}

export { App };
