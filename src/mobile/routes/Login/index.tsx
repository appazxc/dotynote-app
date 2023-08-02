import ContentLoader from '../../../shared/components/ContentLoader';

import LoginPage from './LoginPage';

const loader = async () => {

};

const deferLoader = async () => {

};

export default async function() {
  return {
    Component: LoginPage,
    loader,
    deferLoader,
    loaderComponent: <ContentLoader />,
  };
}
