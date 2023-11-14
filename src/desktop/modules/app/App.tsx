import React from 'react';
import {
  RouterProvider,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import {
  fetchUserSpace,
  fetchSpaceTabsRouteNotes,
  selectActiveSpaceActiveTab,
  selectActiveSpaceId,
  updateActiveSpaceId
} from 'shared/store/slices/appSlice';
import { useQuery } from '@tanstack/react-query';

import { useAppRouter } from './tabs/useTabs';
import { ErrorPage } from './tabs/error/ErrorPage';
import { LoadingPage } from './tabs/loading/LoadingPage';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { SpaceLayout } from './components/SpaceLayout';
import ContentLoader from 'shared/components/ContentLoader';
import { TabProvider } from './components/TabProvider';
import { entityApi } from 'shared/api/entityApi';
import { NO_ENTITIES, USER_ID } from 'shared/constants/queryParams';
import { NoActiveTab } from './tabs/noActiveTab/NoActiveTab';

function App() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveSpaceActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);

  const { data: userSpaceIds } = useQuery({
    queryKey: ['userSpaceIds', activeSpaceId],
    queryFn: () => {
      return entityApi.space.load<string[]>({ params: { [USER_ID]: '1', [NO_ENTITIES]: true }});
    },
    enabled: !activeSpaceId,
  });

  const { isLoading: spaceIsLoading, isError: spaceError, isFetched } = useQuery({
    queryKey: ['space', activeSpaceId],
    queryFn: () => {
      return dispatch(fetchUserSpace(activeSpaceId!));
    },
    enabled: !!activeSpaceId,
  });

  const { isLoading: tabNotesIsLoading, isError: tabNotesError } = useQuery({
    queryKey: ['spaceTabNotes', activeSpaceId],
    queryFn: () => dispatch(fetchSpaceTabsRouteNotes(activeSpaceId!)),
    enabled: isFetched && !!activeSpaceId,
  });

  React.useEffect(() => {
    if (userSpaceIds && userSpaceIds.length && !activeSpaceId) {
      dispatch(updateActiveSpaceId(userSpaceIds[0]));
    }
  }, [dispatch, activeSpaceId, userSpaceIds]);

  // когда нет активного спейса и нет спейсов

  if (spaceError || tabNotesError) {
    return <ErrorPage />;
  }

  if (spaceIsLoading || tabNotesIsLoading) {
    return <LoadingPage />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return (
      <SpaceLayout>
        <NoActiveTab />
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

export { App };
