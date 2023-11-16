import { NoActiveTab } from './NoActiveTab';
import { loader } from './loader';

export default function() {
  return {
    Component: NoActiveTab,
    loader,
    // loaderComponent: <ContentLoader />,
  };
}
