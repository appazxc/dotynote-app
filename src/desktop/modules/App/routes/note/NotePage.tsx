import React from 'react';
import { AppLayout } from 'desktop/modules/app/components/AppLayout';
import { ContentLoader } from 'shared/components/ContentLoader';
import loadable from 'shared/components/loadable';

const NotePageContent = loadable(
  () => import(/* webpackChunkName: "NotePageContent" */ './NotePageContent')
    .then(({ NotePageContent }) => ({ default: NotePageContent })), 
  {
    fallback: <ContentLoader />
  }
);

export const NotePage = () => {
  return (
    <AppLayout showNoteMenu>
      <NotePageContent />
    </AppLayout>
  );
};
