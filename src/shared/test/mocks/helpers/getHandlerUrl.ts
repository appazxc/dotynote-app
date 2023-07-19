import { getBaseApi } from 'shared/helpers/api/getBaseApi';

export const getHandlerUrl = (url: string) => {
  return getBaseApi() + url;
};
