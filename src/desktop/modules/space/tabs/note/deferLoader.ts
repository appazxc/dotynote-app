import { RouteLoader } from 'shared/types/_router';
import { wait } from 'shared/util/wait';

export const deferLoader: RouteLoader = async (params) => {
  console.log('deferLoader params', params);

  await wait(3000);
  
};