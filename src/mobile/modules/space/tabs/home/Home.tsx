import React from 'react';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { TabHeader, TabLayout } from 'mobile/modules/space/components/TabLayout';

export const Home = () => {
  return (
    <TabLayout 
      header={<TabHeader>Home header</TabHeader>} 
      footer={(
        <FooterNavigation isDotMenuDisabled />
      )}
    >
      home
    </TabLayout>
  );
};
