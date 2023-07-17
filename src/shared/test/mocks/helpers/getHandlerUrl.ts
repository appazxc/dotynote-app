import { getBaseApi } from 'shared/api/helpers/getBaseApi';

export const getHandlerUrl = (url: string) => {
  return getBaseApi() + url;
};
