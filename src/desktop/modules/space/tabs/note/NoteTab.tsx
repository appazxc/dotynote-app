import React from 'react';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

import { NoteSidebar } from './containers/NoteSidebar';
import { NoteTabContent } from './NoteTabContent';

export const NoteTab = () => {
  return (
    <TabLayout leftSide={<NoteSidebar />}>
      <NoteTabContent />
    </TabLayout>
  );
};
