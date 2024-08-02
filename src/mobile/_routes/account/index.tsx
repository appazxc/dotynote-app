import { Loader } from 'shared/components/Loader';

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
    loaderComponent: <Loader />,
  };
}
