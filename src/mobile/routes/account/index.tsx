import { ContentLoader } from 'shared/components/ContentLoader';

import { AccountPage } from './AccountPage';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: AccountPage,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
