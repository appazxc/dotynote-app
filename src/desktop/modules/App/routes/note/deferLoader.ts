import { RouteLoader } from "shared/types/common/router";
import { wait } from "shared/utils/wait";

export const deferLoader: RouteLoader = async (params) => {
  console.log('deferLoader params', params);

  await wait(3000);
  
};