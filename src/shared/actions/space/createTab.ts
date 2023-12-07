import { isEqual, omit } from 'lodash';
import { entityApi } from 'shared/api/entityApi';
import { entityNames } from 'shared/constants/entityNames';
import { loaderIds } from 'shared/constants/loaderIds';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { selectIsLoaderInProgress } from 'shared/modules/loaders/loadersSlice';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { addEntity, deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { arrayMaxBy } from 'shared/util/arrayUtil';
import { spaceSelector, spaceTabSelector } from 'shared/selectors/entities';
import { tabNames } from 'shared/modules/space/constants/tabNames';
import { selectActiveSpaceId, selectActiveSpaceTabs } from 'shared/store/slices/appSlice';
import { ThunkAction } from 'shared/store';
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

          const newTempSpace = { 
            spaceTabs: newTabs,
            ...makeActive ? {
              activeTabId: fakeId,
            } : null,
          };

          dispatch(addEntity({
            entityName: entityNames.spaceTab,
            data: tempSpaceTab,
          }));

          dispatch(updateEntity({
            id: spaceId,
            type: entityNames.space,
            data: newTempSpace,
          }));

          const spaceTabId = await entityApi.spaceTab.create(omit(tempSpaceTab, 'id'));
          
          const { spaceTabs = [], activeTabId } = spaceSelector.getById(getState(), spaceId) || {};
          const newSpace = { 
            spaceTabs: spaceTabs.map(id => {
              if (id !== fakeId) {
                return id;
              }

              return spaceTabId;
            }),
            ...makeActive && activeTabId === fakeId ? {
              activeTabId: spaceTabId,
            } : null,
          };


          const mayByChangedSpaceTab = spaceTabSelector.getById(getState(), fakeId);

          if (!isEqual(tempSpaceTab, mayByChangedSpaceTab)) {
            await entityApi.spaceTab.update(spaceTabId, mayByChangedSpaceTab);
          }
          
          await entityApi.space.update(spaceId, newSpace);
          dispatch(deleteEntity({ id: fakeId, type: entityNames.spaceTab }));
          // eslint-disable-next-line no-empty
        } catch (err) {
          console.log('err', err);
        }
      }));
  };