import PageLoader from 'shared/components/PageLoader';

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
    loaderComponent: <PageLoader />,
  };
}
