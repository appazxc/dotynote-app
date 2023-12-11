import { isEqual, omit, pick } from 'lodash';

import { entityApi } from 'shared/api/entityApi';
import { entityNames } from 'shared/constants/entityNames';
import { loaderIds } from 'shared/constants/loaderIds';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { selectIsLoaderInProgress } from 'shared/modules/loaders/loadersSlice';
import { tabNames } from 'shared/modules/space/constants/tabNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { spaceSelector, spaceTabSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/store';
import { 
  selectActiveSpaceId,
  selectActiveSpaceTabs,
  selectActiveTabId,
  updateActiveTabId,
} from 'shared/store/slices/appSlice';
import { addEntity, deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { arrayMaxBy } from 'shared/util/arrayUtil';
import { invariant } from 'shared/util/invariant';

type CreateSpaceTabParams = { 
  fromTabId?: string, 
  route?: string, 
  spaceId?: string, 
  makeActive?: boolean,
};

export const createTab = (params: CreateSpaceTabParams = {}): ThunkAction => 
  async (dispatch, getState) => {
    const { spaceId: paramSpaceId, route, makeActive } = params;
    const isLoading = selectIsLoaderInProgress(getState(), loaderIds.createTab);
    
    if (isLoading) {
      return;
    }

    dispatch(withLoader(loaderIds.createTab, 
      async (dispatch, getState) => {
        try {
          const activeSpaceId = selectActiveSpaceId(getState());
          const spaceId = paramSpaceId || activeSpaceId;
          const { spaceTabs: spaceTabIds = [] } = spaceSelector.getById(getState(), spaceId) || {};
          const tabEntities = spaceTabSelector.getByIds(getState(), spaceTabIds);
          const routes = [route || buildTabUrl({ routeName: tabNames.home })];
          const maxPos = arrayMaxBy(tabEntities, (item: SpaceTabEntity) => item.pos);
          const pos = maxPos + 1000;

          invariant(spaceId, 'Missing spaceId');

          const tempSpaceTab = entityApi.spaceTab.createFake({ spaceId, pos, routes });
          const { id: fakeId } = tempSpaceTab;

          const tabs = selectActiveSpaceTabs(getState());
          const newTabs = [...tabs, fakeId];

          dispatch(addEntity({
            entityName: entityNames.spaceTab,
            data: tempSpaceTab,
          }));

          dispatch(updateEntity({
            id: spaceId,
            type: entityNames.space,
            data: { 
              spaceTabs: newTabs,
            },
          }));

          if (makeActive) {
            dispatch(updateActiveTabId(fakeId));
          }

          const spaceTabId = await entityApi.spaceTab.create(omit(tempSpaceTab, 'id'));
          const mayByChangedSpaceTab = spaceTabSelector.getById(getState(), fakeId);

          const checkProps = ['routes', 'pos'];
          if (!isEqual(pick(tempSpaceTab, checkProps), pick(mayByChangedSpaceTab, checkProps))) {
            entityApi.spaceTab.update(spaceTabId, mayByChangedSpaceTab);
          }

          const { spaceTabs = [] } = spaceSelector.getById(getState(), spaceId) || {};
          const newSpace = { 
            spaceTabs: spaceTabs.map(id => {
              if (id !== fakeId) {
                return id;
              }

              return spaceTabId;
            }),
          };

          entityApi.space.update(spaceId, newSpace);

          const currentActiveTabId = selectActiveTabId(getState());
          if (currentActiveTabId === fakeId) {
            dispatch(updateActiveTabId(spaceTabId));
          }

          dispatch(deleteEntity({ id: fakeId, type: entityNames.spaceTab }));
           
        } catch (err) {
          console.log('err', err);
        }
      }));
  };