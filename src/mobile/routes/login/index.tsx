import { Loader } from 'shared/components/Loader';

import { Login } from './Login';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: Login,
    loader,
    deferLoader,
    loaderComponent: <Loader />,
  };
}
