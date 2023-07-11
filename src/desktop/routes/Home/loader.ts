import { RouteLoader } from 'shared/types/common/router';

const loader: RouteLoader = async (args) => {
  console.log('loader Home');

  return null;
};

export default loader;
