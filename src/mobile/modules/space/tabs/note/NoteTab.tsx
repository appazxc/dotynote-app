import React from 'react';

import { useParams } from 'react-router';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { TabLayout } from 'mobile/modules/space/components/TabLayout';

import { NoteHeader } from './containers/NoteHeader';
import { NoteTabContent } from './NoteTabContent';

export const NoteTab = () => {
  const { noteId = "" } = useParams();

  return (
    <TabLayout 
      header={<NoteHeader />} 
      footer={(
        <FooterNavigation
          noteId={noteId}
        />
      )}
    >
      <NoteTabContent />
    </TabLayout>
  );
};
