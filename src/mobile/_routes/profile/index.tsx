import { Loader } from 'shared/components/Loader';

import { ProfilePage } from './ProfilePage';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: ProfilePage,
    loader,
    deferLoader,
    loaderComponent: <Loader />,
  };
}
