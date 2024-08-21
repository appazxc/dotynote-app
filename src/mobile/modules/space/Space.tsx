import React from 'react';

import { RouterProvider } from '@tanstack/react-router';

import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/tabRoutes/useTabRouter';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import { LayoutLoader } from 'mobile/components/LayoutLoader';
import { createTabRouter } from 'mobile/modules/space/tabRoutes/router';

function Space() {
  const activeTab = useAppSelector(selectActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);

  invariant(activeSpaceId, 'activeSpaceId is missings');
  invariant(activeTab, 'activeTab is missings');

  return (
    <TabProvider tab={activeTab}>
      <SpaceTabContent
        isFake={activeTab._isFake}
        activeTabId={activeTab.id}
      />
    </TabProvider>
  );
}

type SpaceTabContentProps = { 
  activeTabId: string, 
  isLoading?: boolean, 
  isFake?: boolean 
};

function SpaceTabContent({ activeTabId, isFake, isLoading }: SpaceTabContentProps) {
  const router = useTabRouter(activeTabId, createTabRouter);

  const renderedProvider = React.useMemo(() => (
    <RouterProvider key={activeTabId} router={router} />
  ), 
  [router, activeTabId]);

  return isFake || isLoading
    ? <LayoutLoader />
    : renderedProvider;
}

export { Space };
