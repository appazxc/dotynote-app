import { isEqual, pick } from 'lodash';

import { entityApi } from 'shared/api/entityApi';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { entityNames } from 'shared/constants/entityNames';
import { loaderIds } from 'shared/constants/loaderIds';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { selectIsLoaderInProgress } from 'shared/modules/loaders/loadersSlice';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { spaceTabSelector } from 'shared/selectors/entities';
import {
  selectActiveSpaceId,
  selectActiveTabId,
  updateActiveTabId,
} from 'shared/store/slices/appSlice';
import { addEntity } from 'shared/store/slices/entitiesSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { ThunkAction } from 'shared/types/store';
import { arrayMaxBy } from 'shared/util/arrayUtil';
import { invariant } from 'shared/util/invariant';

type CreateSpaceTabParams = { 
  fromTabId?: string, 
  route?: string, 
  makeActive?: boolean,
};

export const openTab = (params: CreateSpaceTabParams = {}): ThunkAction => 
  async (dispatch, getState) => {
    const { route, makeActive } = params;
    const isLoading = selectIsLoaderInProgress(getState(), loaderIds.createTab);
    
    if (isLoading) {
      return;
    }

    dispatch(withLoader(loaderIds.createTab, 
      async (dispatch, getState) => {
        try {
          const activeSpaceId = selectActiveSpaceId(getState());
          const spaceId = activeSpaceId;

          invariant(spaceId, 'Missing spaceId');

          const spaceTabIds = queryClient.getQueryData(options.spaceTabs.list({ spaceId }).queryKey) || [];
          const tabEntities = spaceTabSelector.getByIds(getState(), spaceTabIds);
          const routes = [route || buildTabUrl({ routeName: tabRouteNames.home })];
          const maxPos = arrayMaxBy(tabEntities, (item: SpaceTabEntity) => item.pos);
          const pos = maxPos + 1000;

          const spaceTabEntity = { spaceId, pos, routes };

          const fakeSpaceTab = entityApi.spaceTab.createFake(spaceTabEntity);
          const { id: fakeId } = fakeSpaceTab;
          
          dispatch(addEntity({
            entityName: entityNames.spaceTab,
            data: fakeSpaceTab,
          }));
          
          queryClient.setQueryData(
            options.spaceTabs.list({ spaceId }).queryKey, 
            (oldTabs = []) => {
              console.log('oldTabs', oldTabs);
              
              return [...oldTabs, fakeId]
            }
          );

          if (makeActive) {
            dispatch(updateActiveTabId(fakeId));
          }

          const spaceTabId = await entityApi.spaceTab.create(spaceTabEntity);

          const mayByChangedSpaceTab = spaceTabSelector.getById(getState(), fakeId);

          const checkProps = ['routes', 'pos'];
          if (!isEqual(pick(spaceTabEntity, checkProps), pick(mayByChangedSpaceTab, checkProps))) {
            entityApi.spaceTab.update(spaceTabId, mayByChangedSpaceTab);
          }

          queryClient.setQueryData(
            options.spaceTabs.list({ spaceId }).queryKey, 
            (oldTabs = []) => oldTabs.map((tabId) => {
              if (tabId === fakeId) {
                return spaceTabId;
              }

              return tabId;
            })
          );

          const currentActiveTabId = selectActiveTabId(getState());
          if (currentActiveTabId === fakeId) {
            dispatch(updateActiveTabId(spaceTabId));
          }

          entityApi.spaceTab.deleteEntity(fakeId);
           
        } catch (err) {
          console.log('err', err);
        }
      }));
  };