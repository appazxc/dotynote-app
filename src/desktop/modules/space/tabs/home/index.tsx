import { HomeTab } from './HomeTab';
import { loader } from './loader';

export default function() {
  return {
    Component: HomeTab,
    loader,
    // loaderComponent: <ContentLoader />,
  };
}
