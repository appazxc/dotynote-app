import { RouteLoader } from 'shared/types/common/router';
import { wait } from 'shared/utils/wait';

const loader: RouteLoader = async (args) => {
  console.log('loader App');
  await wait(3000);
  console.log('after loader App');

  return 'hehllo';
};

export default loader;
