import { updateTab } from 'shared/actions/space/updateTab';
import qs from 'qs';
import { spaceTabSelector } from 'shared/selectors/entities';

export const addQueryParamToTabLastRoute = (tabId, newParams) => (dispatch, getState) => {
  const tab = spaceTabSelector.getById(getState(), tabId);

  if (!tab) {
    return;
  }

  const lastRoute = tab.routes[tab.routes.length - 1];

  const newRoute = insertParam(lastRoute, newParams);
  const newRoutes = [...tab.routes.slice(0, -1), newRoute];

  dispatch(updateTab({ id: tabId, data: { routes: newRoutes }}));
};


const insertParam = (route, newParams) => {
  const [path, queryString = ''] = route.split('?');

  const objParams = qs.parse(queryString);

  const newQueryParams = qs.stringify({
    ...objParams,
    ...newParams
  });
  
  return `${path}?${newQueryParams}`;
};