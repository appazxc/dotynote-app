import React from 'react';

import { useParams } from 'react-router';

import { TabHeader } from 'mobile/modules/space/components/TabLayout';

export const NoteHeader = () => {
  const { noteId = "" } = useParams();

  return (
    <TabHeader>NoteTab title {noteId}</TabHeader>
  );
};
