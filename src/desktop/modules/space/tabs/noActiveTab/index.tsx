import { loader } from './loader';
import { NoActiveTab } from './NoActiveTab';

export default function() {
  return {
    Component: NoActiveTab,
    loader,
    // loaderComponent: <ContentLoader />,
  };
}
