import React from 'react';
import { TabLayout } from 'mobile/modules/space/components/TabLayout';
import { NoteTabContent } from './NoteTabContent';
import { NoteHeader } from './containers/NoteHeader';
import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { useParams } from 'react-router';

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
