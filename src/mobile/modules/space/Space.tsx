import { RouterProvider } from '@tanstack/react-router';
import React from 'react';

import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/tabRoutes/useTabRouter';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

import { LayoutLoader } from 'mobile/components/LayoutLoader';
import { createTabRouter } from 'mobile/modules/space/tabRoutes/router';

type Props = {
  tab: SpaceTabEntity;
  isLoading?: boolean;
}

const Space = React.memo(({ tab, isLoading }: Props) => {
  return (
    <TabProvider tab={tab}>
      <SpaceTabContent
        isLoading={isLoading}
        tabId={tab.id}
      />
    </TabProvider>
  );
});

type SpaceTabContentProps = { 
  tabId: string; 
  isLoading?: boolean; 
};

function SpaceTabContent({ tabId, isLoading }: SpaceTabContentProps) {
  const router = useTabRouter(tabId, createTabRouter);

  return isLoading
    ? <LayoutLoader />
    : <RouterProvider router={router} />;
}

export { Space };
