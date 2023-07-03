import { RouteLoader } from 'shared/types/common/routes';

const loader: RouteLoader = async (args) => {
  console.log('loader Home');

  return null;
};

export default loader;
