import { Loader } from 'shared/components/Loader';

import { Spaces } from './Spaces';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: Spaces,
    loader,
    deferLoader,
    loaderComponent: <Loader />,
  };
}
