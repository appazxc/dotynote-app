import { ContentLoader } from 'shared/components/ContentLoader';

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
    loaderComponent: <ContentLoader />,
  };
}
