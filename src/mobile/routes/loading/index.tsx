import { ContentLoader } from 'shared/components/ContentLoader';

import { LoadingPage } from './LoadingPage';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: LoadingPage,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
