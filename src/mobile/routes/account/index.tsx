import { ContentLoader } from 'shared/components/ContentLoader';

import { Account } from './Account';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: Account,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
