import React from 'react';
import { TabHeader, TabLayout } from 'mobile/modules/space/components/TabLayout';
import { FooterNavigation } from 'mobile/containers/FooterNavigation';

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
