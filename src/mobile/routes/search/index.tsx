import { ContentLoader } from 'shared/components/ContentLoader';

import { SearchPage } from './SearchPage';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: SearchPage,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
