import React from 'react';

import { useQuery } from '@tanstack/react-query';
import {
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { queries } from 'shared/api/queries';
import { ContentLoader } from 'shared/components/ContentLoader';
import { routeNames } from 'shared/constants/routeNames';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/space/helpers/useTabRouter';
import { useAppSelector } from 'shared/store/hooks';
import {
  selectActiveSpaceId,
  selectActiveTab,
} from 'shared/store/slices/appSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { buildUrl } from 'shared/util/router/buildUrl';

import { Error as ErrorPage } from 'desktop/modules/space/components/pages/Error';
import { Loading as LoadingPage } from 'desktop/modules/space/components/pages/Loading';
import { NonActiveTab } from 'desktop/modules/space/components/pages/NonActiveTab';
import { SpaceLayout } from 'desktop/modules/space/components/SpaceLayout';
import { ErrorTab } from 'desktop/modules/space/tabs/error/ErrorTab';
import { HomeTab } from 'desktop/modules/space/tabs/home/HomeTab';
import { LoadingTab } from 'desktop/modules/space/tabs/loading/LoadingTab';
import { tabsDictionary } from 'desktop/modules/space/tabs/tabsDictionary';
import router from 'desktop/routes/router';

function Space() {
  const activeTab = useAppSelector(selectActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);

  const { 
    // isLoading: tabNotesIsLoading, 
    isError: tabNotesIsError,
    isFetched: tabNotesIsFetched,
  } = useQuery({
    ...queries.notes.tabNotes(activeSpaceId!),
    enabled: !!activeSpaceId,
  });
 
  React.useEffect(() => {
    if (activeSpaceId) return;
    router.navigate(buildUrl({ routeName: routeNames.spaces }));
  }, [activeSpaceId]);
 
  if (tabNotesIsError) {
    return <ErrorPage />;
  }

  if (!tabNotesIsFetched) {
    return <LoadingPage />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return (
      <NonActiveTab />
    );
  }

  if (activeTab.isFake) {
    return (
      <SpaceLayout>
        <ContentLoader />
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
      fallbackElement={<ContentLoader text="Tab fallbackElement" />}
    />
  );
}

export { Space };
