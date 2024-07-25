import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { Loader } from 'shared/components/Loader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';

import { NonActiveTab } from 'desktop/modules/space/components/pages/NonActiveTab';
import { SpaceLayout } from 'desktop/modules/space/components/SpaceLayout';
import { SpaceLoading } from 'desktop/modules/space/components/SpaceLoading';
import { router } from 'desktop/modules/space/tabRoutes/router';

import { useTabRouter } from './tabRoutes/useTabRouter';

const Space = React.memo(() => {
  const activeTab = useAppSelector(selectActiveTab);
  const activeSpace = useAppSelector(selectActiveSpace);

  const { 
    isLoading: tabNotesIsLoading,
  } = useQuery({
    // проверить чтобы лишних квери не было
    ...options.notes.tabNotes(activeSpace?.id, router),
    enabled: !!activeSpace,
    throwOnError: true,
  });

  if (tabNotesIsLoading) {
    return <SpaceLoading />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return (
      <NonActiveTab />
    );
  }

  return (
    <TabProvider tab={activeTab}>
      <SpaceLayout>
        <SpaceTabContent isFake={activeTab._isFake} activeTabId={activeTab.id} />
      </SpaceLayout>
    </TabProvider>
  );
});

const SpaceTabContent = React.memo(({ activeTabId, isFake }: { activeTabId: string, isFake?: boolean }) => {
  const router = useTabRouter(activeTabId);

  const renderedProvider = React.useMemo(() => 
    <RouterProvider key={activeTabId} router={router} />, 
  [activeTabId, router]);

  return isFake ? <Loader />: (renderedProvider);
});

export { Space };
