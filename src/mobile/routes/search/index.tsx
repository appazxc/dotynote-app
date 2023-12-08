import { ContentLoader } from 'shared/components/ContentLoader';

import { Search } from './Search';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: Search,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
