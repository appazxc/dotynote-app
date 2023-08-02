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

import { useAppRouter } from './hooks/useAppRouter';
import { ErrorTab } from './tabs/error/ErrorTab';
import { LoadingTab } from './tabs/loading/LoadingTab';
import { Untabed } from './tabs/untabed/Untabed';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

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
    queryFn: () => dispatch(fetchSpaceTabsRouteNotes(appSession?.activeSpaceId)),
    enabled: isFetched,
  });

  if (!appSession) {
    return <NotFoundPage />;
  }

  if (spaceError || spaceTabsError || tabNotesError) {
    return <ErrorTab />;
  }

  if (spaceIsLoading || spaceTabsIsLoading || tabNotesIsLoading) {
    return <LoadingTab />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return <Untabed />;
  }

  return (
    <AppEntry activeTab={activeTab} />
  );
}

function AppEntry({ activeTab }: { activeTab: SpaceTabEntity }) {
  const router = useAppRouter(activeTab);

  return <RouterProvider key={activeTab.id} router={router} />;
}

export { App };
