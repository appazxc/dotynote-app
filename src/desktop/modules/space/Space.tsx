import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { invariant, RouterProvider } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { Loader } from 'shared/components/Loader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/tabRoutes/useTabRouter';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';

import { NonActiveTab } from 'desktop/modules/space/components/pages/NonActiveTab';
import { SpaceLayout } from 'desktop/modules/space/components/SpaceLayout';
import { SpaceLoading } from 'desktop/modules/space/components/SpaceLoading';
import { createTabRouter, router } from 'desktop/modules/tabRoutes/router';

const Space = React.memo(() => {
  const activeTab = useAppSelector(selectActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);

  invariant(activeSpaceId, 'activeSpaceId is missings');

  const { 
    isLoading: tabNotesIsLoading,
  } = useQuery({
    // проверить чтобы лишних квери не было
    ...options.notes.tabNotes(activeSpaceId, router),
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
  const router = useTabRouter(activeTabId, createTabRouter);

  const renderedProvider = React.useMemo(() => 
    <RouterProvider key={activeTabId} router={router} />, 
  [activeTabId, router]);

  return isFake ? <Loader /> : (renderedProvider);
});

export { Space };
