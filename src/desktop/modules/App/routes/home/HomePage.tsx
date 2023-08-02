import React from 'react';
import { AppLayout } from 'desktop/modules/App/components/AppLayout';
import Loadable from 'shared/components/Loadable';
import { ContentLoader } from 'shared/components/ContentLoader';

const HomePageContent = Loadable(
  () => import(/* webpackChunkName: "HomePageContent" */ './HomePageContent')
    .then(({ HomePageContent }) => ({ default: HomePageContent })), 
  {
    fallback: <ContentLoader />
  }
);

function HomePage() {
  return (
    <HomePageContent />
  );
}

export { HomePage };
