import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { Loader } from 'shared/components/Loader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useAppSelector } from 'shared/store/hooks';
import {
  selectActiveSpace,
  selectActiveTab,
} from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';

import { Error as ErrorPage } from 'desktop/modules/space/components/pages/Error';
import { NonActiveTab } from 'desktop/modules/space/components/pages/NonActiveTab';
import { SpaceLayout } from 'desktop/modules/space/components/SpaceLayout';
import { SpaceLoading } from 'desktop/modules/space/components/SpaceLoading';
import { router } from 'desktop/routes/router';

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
    router.navigate({ to: '/app/spaces' });
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

  return (
    <TabProvider tab={activeTab}>
      <SpaceLayout>
        <SpaceTabContent activeTabId={activeTab.id} />
      </SpaceLayout>
    </TabProvider>
  );
});

const SpaceTabContent = React.memo(({ activeTabId }: { activeTabId: IdentityType }) => {
  const router = useTabRouter(activeTabId);

  const renderedProvider = React.useMemo(() => 
    <RouterProvider key={activeTabId} router={router} />, 
  [activeTabId, router]);

  return (renderedProvider);
});

export { Space };
