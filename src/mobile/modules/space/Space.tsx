import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { BrowserRouterProvider } from 'shared/components/BrowserRouterProvider';
import { Loader } from 'shared/components/Loader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/space/tabRoutes/useTabRouter';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { NonActiveTab } from 'mobile/modules/space/components/NonActiveTab';
import { createTabRouter, router } from 'mobile/modules/space/tabRoutes/router';

function Space() {
  const activeTab = useAppSelector(selectActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);

  invariant(activeSpaceId, 'activeSpaceId is missings');

  const {
    isLoading: tabNotesIsLoading,
  } = useQuery({
    ...options.notes.tabNotes(activeSpaceId, router),
    throwOnError: true,
  });

  if (tabNotesIsLoading) {
    return <Loader delay={300} />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return <NonActiveTab />;
  }

  return (
    <BrowserRouterProvider>
      <TabProvider tab={activeTab}>
        <SpaceTabContent isFake={activeTab._isFake} activeTabId={activeTab.id} />
      </TabProvider>
    </BrowserRouterProvider>
  );
}

function SpaceTabContent({ activeTabId, isFake }: { activeTabId: string, isFake?: boolean }) {
  const router = useTabRouter(activeTabId, createTabRouter);

  const renderedProvider = React.useMemo(() => 
    <RouterProvider key={activeTabId} router={router} />, 
  [activeTabId, router]);

  return isFake 
    ? <TabLayout footer={<FooterNavigation />}><Loader /></TabLayout>
    : renderedProvider;
}

export { Space };
