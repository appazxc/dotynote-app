import { ContentLoader } from 'shared/components/ContentLoader';

import { TabsPage } from './TabsPage';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: TabsPage,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
