import { fetchAppSession, fetchUserSpace, fetchSpaceTabs, selectAppSession } from 'shared/store/slices/appSlice';
import { RouteLoader } from 'shared/types/common/router';

export const deferLoader: RouteLoader = async ({ store }) => {
  const { dispatch, getState } = store;
  await dispatch(fetchAppSession());

  const appSession = selectAppSession(getState());

  if (!appSession) {
    // TODO: обрабатывать ошибку
    throw new Error('Отсутствует appSession');
  }

  await Promise.all([
    fetchUserSpace(appSession.activeSpaceId),
    fetchSpaceTabs(appSession.activeSpaceTabId),
  ].map(dispatch));
};
