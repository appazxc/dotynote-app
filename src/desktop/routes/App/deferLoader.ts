import { fetchAppSession } from 'shared/store/slices/appSlice';
import { RouteLoader } from 'shared/types/common/router';

export const deferLoader: RouteLoader = async ({ store }) => {
  const { dispatch } = store;

  await Promise.all([
    fetchAppSession(),
  ].map(dispatch));
};
