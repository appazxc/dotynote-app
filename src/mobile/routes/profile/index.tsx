import { ContentLoader } from 'shared/components/ContentLoader';

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
    loaderComponent: <ContentLoader />,
  };
}
