import React from 'react';
import { ContentLoader } from 'shared/components/ContentLoader';
import loadable from 'shared/components/Loadable';

const NotePageContent = loadable(
  () => import(/* webpackChunkName: "NotePageContent" */ './NotePageContent')
    .then(({ NotePageContent }) => ({ default: NotePageContent })), 
  {
    fallback: <ContentLoader />
  }
);

export const NotePage = () => {
  return (
    <NotePageContent />
  );
};
