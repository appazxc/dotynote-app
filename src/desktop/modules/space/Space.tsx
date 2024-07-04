import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import {
  RouterProvider as OldRouterProvider,
} from 'react-router-dom';

import { options } from 'shared/api/options';
import { Loader } from 'shared/components/Loader';
import { routeNames } from 'shared/constants/routeNames';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter as useOldTabRouter } from 'shared/modules/space/helpers/useTabRouter';
import { useAppSelector } from 'shared/store/hooks';
import {
  selectActiveSpace,
  selectActiveTab,
} from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { buildUrl } from 'shared/util/router/buildUrl';

import router from 'desktop/_routes/router';
import { ErrorTab } from 'desktop/modules/space/_tabs/error/ErrorTab';
import { HomeTab } from 'desktop/modules/space/_tabs/home/HomeTab';
import { LoadingTab } from 'desktop/modules/space/_tabs/loading/LoadingTab';
import { tabsDictionary } from 'desktop/modules/space/_tabs/tabsDictionary';
import { Error as ErrorPage } from 'desktop/modules/space/components/pages/Error';
import { NonActiveTab } from 'desktop/modules/space/components/pages/NonActiveTab';
import { SpaceLayout } from 'desktop/modules/space/components/SpaceLayout';
import { SpaceLoading } from 'desktop/modules/space/components/SpaceLoading';

import { useTabRouter } from './tabRoutes/useTabRouter';

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
    return <SpaceLoading />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return (
      <NonActiveTab />
    );
  }

  if (activeTab.isFake) {
    return (
      <SpaceLayout>
        <Loader />
      </SpaceLayout>
    );
  }

  const newRouter = true;

  return (
    <TabProvider tab={activeTab}>
      <SpaceLayout>
        {newRouter ? <SpaceTabContent activeTabId={activeTab.id} /> : <OldSpaceTabContent activeTabId={activeTab.id} />}
      </SpaceLayout>
    </TabProvider>
  );
});

const SpaceTabContent = React.memo(({ activeTabId }: { activeTabId: IdentityType }) => {
  const router = useTabRouter(activeTabId);

  return (
    <RouterProvider key={activeTabId} router={router} />
  );
});

const OldSpaceTabContent = React.memo(({ activeTabId }: { activeTabId: IdentityType }) => {
  const router = useOldTabRouter(
    activeTabId,
    tabsDictionary,
    {
      notFoundPage: <HomeTab />,
      errorPage: <ErrorTab />,
      loadingPage: <LoadingTab />,
    }
  );

  return (
    <OldRouterProvider
      key={activeTabId}
      router={router}
      fallbackElement={<Loader />}
    />
  );
});

export { Space };
