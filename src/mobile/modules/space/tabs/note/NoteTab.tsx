import React from 'react';
import { TabLayout } from 'mobile/modules/space/components/TabLayout';
import { NoteTabContent } from './NoteTabContent';
import { NoteHeader } from './containers/NoteHeader';
import { NoteFooter } from './containers/NoteFooter';

export const NoteTab = () => {
  return (
    <TabLayout header={<NoteHeader />} footer={<NoteFooter />}>
      <NoteTabContent />
    </TabLayout>
  );
};
