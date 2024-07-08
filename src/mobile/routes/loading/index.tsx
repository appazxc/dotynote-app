import { Loader } from 'shared/components/Loader';

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
    loaderComponent: <Loader />,
  };
}
