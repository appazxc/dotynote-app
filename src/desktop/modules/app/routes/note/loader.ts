import { RouteLoader } from "shared/types/common/router";
import { wait } from "shared/utils/wait";

export const loader: RouteLoader = async (params) => {
  console.log('loader params', params);

  await wait(2000);
};