import React from 'react';

import { useQuery } from '@tanstack/react-query';
import {
  RouterProvider,
} from 'react-router-dom';

import { options } from 'shared/api/options';
import { ContentLoader } from 'shared/components/ContentLoader';
import { routeNames } from 'shared/constants/routeNames';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/space/helpers/useTabRouter';
import { useAppSelector } from 'shared/store/hooks';
import {
  selectActiveSpace,
  selectActiveTab,
} from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
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

const Space = React.memo(() => {
  const activeTab = useAppSelector(selectActiveTab);
  const activeSpace = useAppSelector(selectActiveSpace);

  const { 
    isError: tabNotesIsError,
    isLoading: tabNotesIsLoading,
  } = useQuery({
    // проверить чтобы лишних квери не было
    ...options.notes.tabNotes(activeSpace?.id),
    enabled: !!activeSpace,
  });

  const { 
    isLoading: spaceTabsIsLoading, 
    isError: spaceTabsIsError,
  } = useQuery({
    ...options.spaceTabs.list({ spaceId: activeSpace?.id }),
    enabled: !!activeSpace,
  });
 
  React.useEffect(() => {
    if (activeSpace?.id) return;
    router.navigate(buildUrl({ routeName: routeNames.spaces }));
  }, [activeSpace?.id]);
 
  if (tabNotesIsError || spaceTabsIsError) {
    return <ErrorPage />;
  }

  if (tabNotesIsLoading || spaceTabsIsLoading || !activeSpace) {
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
        <SpaceTabContent activeTabId={activeTab.id} />
      </SpaceLayout>
    </TabProvider>
  );
});

const SpaceTabContent = React.memo(({ activeTabId }: { activeTabId: IdentityType }) => {
  const router = useTabRouter(
    activeTabId,
    tabsDictionary,
    {
      notFoundPage: <HomeTab />,
      errorPage: <ErrorTab />,
      loadingPage: <LoadingTab />,
    }
  );

  return (
    <RouterProvider
      key={activeTabId}
      router={router}
      fallbackElement={<ContentLoader />}
    />
  );
});

export { Space };
