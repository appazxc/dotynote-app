import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { Loader } from 'shared/components/Loader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/space/tabRoutes/useTabRouter';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { NonActiveTab } from 'mobile/modules/space/components/pages/NonActiveTab';
import { SpaceLayout } from 'mobile/modules/space/components/SpaceLayout';
import { createTabRouter } from 'mobile/modules/space/tabRoutes/router';
import { router } from 'mobile/routes/router';

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

  if (!tabNotesIsLoading) {
    return <Loader delay={300} />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return <NonActiveTab />;
  }

  return (
    <TabProvider tab={activeTab}>
      <SpaceLayout>
        <SpaceTabContent isFake={activeTab._isFake} activeTabId={activeTab.id} />
      </SpaceLayout>
    </TabProvider>

  );
}

function SpaceTabContent({ activeTabId, isFake }: { activeTabId: string, isFake?: boolean }) {
  const router = useTabRouter(activeTabId, createTabRouter);

  const renderedProvider = React.useMemo(() => 
    <RouterProvider key={activeTabId} router={router} />, 
  [activeTabId, router]);

  return isFake ? <Loader />: (renderedProvider);
}

export { Space };
