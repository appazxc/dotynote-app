import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';

import { entityApi } from 'shared/api/entityApi';
import { entityNames } from 'shared/constants/entityNames';
import { loaderIds } from 'shared/constants/loaderIds';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { selectIsLoaderInProgress } from 'shared/modules/loaders/loadersSlice';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectActiveTabId } from 'shared/selectors/tab/selectActiveTabId';
import { updateActiveTabId } from 'shared/store/slices/appSlice';
import { addEntity } from 'shared/store/slices/entitiesSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { ThunkAction } from 'shared/types/store';
import { arrayMaxBy } from 'shared/util/arrayUtil';
import { invariant } from 'shared/util/invariant';

type CreateSpaceTabParams = { 
  route?: string, 
  active?: boolean,
};

export const openTab = (params: CreateSpaceTabParams = {}): ThunkAction => 
  async (dispatch, getState) => {
    const { route, active } = params;
    const isLoading = selectIsLoaderInProgress(getState(), loaderIds.createTab);
    
    if (isLoading) {
      return;
    }

    dispatch(withLoader(loaderIds.createTab, 
      async (dispatch, getState) => {
        try {
          const activeSpace = selectActiveSpace(getState());

          invariant(activeSpace, 'Missing active space');

          const tabs = activeSpace.tabs;
          const tabIds = tabs.map(({ id }) => id);
          const routes = [route || '/'];
          const maxPos = arrayMaxBy(tabs, (item: SpaceTabEntity) => item.pos);
          const pos = maxPos + 1000;

          const spaceTabEntity = { spaceId: activeSpace.id, pos, routes };

          const fakeSpaceTab = entityApi.spaceTab.createFake(spaceTabEntity);
          const { id: fakeId } = fakeSpaceTab;
          
          dispatch(addEntity({
            type: entityNames.spaceTab,
            data: fakeSpaceTab,
          }));
          
          const newSpaceTabs = [...tabIds, fakeId];

          entityApi.space.updateEntity(activeSpace.id, {
            tabs: newSpaceTabs,
          });

          if (active) {
            dispatch(updateActiveTabId(fakeId));
          }

          const spaceTabId = await entityApi.spaceTab.create(spaceTabEntity);

          const mayByChangedSpaceTab = spaceTabSelector.getEntityById(getState(), fakeId);

          if (!mayByChangedSpaceTab) {
            entityApi.spaceTab.delete(spaceTabId);
            return;
          }

          const checkProps = ['routes', 'pos'];
          if (!isEqual(pick(spaceTabEntity, checkProps), pick(mayByChangedSpaceTab, checkProps))) {
            entityApi.spaceTab.update(spaceTabId, mayByChangedSpaceTab);
          }

          entityApi.space.updateEntity(activeSpace.id, {
            tabs: newSpaceTabs.map((tabId) => {
              if (tabId === fakeId) {
                return spaceTabId;
              }

              return tabId;
            }),
          });
          
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