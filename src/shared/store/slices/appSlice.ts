import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import api from 'shared/api';
import { spaceSelector, spaceTabSelector } from 'shared/selectors/entities';
import { EMPTY_ARRAY } from 'shared/constants/common';
import { INVALID_ID } from 'shared/constants/errors';
import { getTabMatch } from 'shared/modules/space/helpers/tabHelpers';
import { tabNames } from 'shared/modules/space/constants/tabNames';

import { AppState, AppThunk, ThunkAction } from '..';
import { loaderIds } from 'shared/constants/loaderIds';
import { withAppLoader } from 'shared/modules/loaders/actions/withAppLoaders';
import { selectIsLoaderInProgress } from 'shared/modules/loaders/loadersSlice';
import { withLoader } from 'shared/modules/loaders/actions/withLoaders';
import { entityApi } from 'shared/api/entityApi';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { getNextActiveTabId } from 'shared/helpers/space/spaceTabsHelpers';
import { addEntity, deleteEntity, updateEntity } from './entitiesSlice';
import { entityNames } from 'shared/constants/entityNames';
import { omit } from 'lodash';
import { arrayMaxBy } from 'shared/util/arrayUtil';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

export const fetchUserSpace = (id?: string): ThunkAction<string> => 
  async (dispatch, getState) => {
    if (!id) {
      return Promise.reject(new Error(INVALID_ID));
    }

    return await api.loadSpace(id);
  };

type CreateSpaceTabParams = { 
  fromTabId?: string, 
  path?: string, 
  spaceId: string, 
  navigate?: boolean,
};

export const createSpaceTab = ({ spaceId, path, navigate }: CreateSpaceTabParams): ThunkAction => 
  async (dispatch, getState) => {
    const isLoading = selectIsLoaderInProgress(getState(), loaderIds.createSpaceTab);
    
    if (isLoading) {
      return;
    }

    dispatch(withLoader(loaderIds.createSpaceTab, withAppLoader(loaderIds.createSpaceTab, 
      async (dispatch, getState) => {
        try {
          const { spaceTabs: spaceTabIds = [] } = spaceSelector.getById(getState(), spaceId) || {};
          const tabEntities = spaceTabSelector.getByIds(getState(), spaceTabIds);
          const routes = [path || buildTabUrl({ routeName: tabNames.home })];
          const maxPos = arrayMaxBy(tabEntities, (item: SpaceTabEntity) => item.pos);
          const pos = maxPos + 1000;

          const fakeSpaceTab = entityApi.spaceTab.createFake({ spaceId, pos, routes });
          const { id: fakeId } = fakeSpaceTab;

          const tabs = selectActiveSpaceTabs(getState());
          const newTabs = [...tabs, fakeId];

          const newTempSpace = { 
            spaceTabs: newTabs,
            ...navigate ? {
              activeTabId: fakeId,
            } : null,
          };

          dispatch(addEntity({
            entityName: entityNames.spaceTab,
            data: fakeSpaceTab,
          }));

          dispatch(updateEntity({
            id: spaceId,
            type: entityNames.space,
            data: newTempSpace,
          }));

          const spaceTabId = await entityApi.spaceTab.create(omit(fakeSpaceTab, 'id'));
          
          const { spaceTabs = [], activeTabId } = spaceSelector.getById(getState(), spaceId) || {};
          const newSpace = { 
            spaceTabs: spaceTabs.map(id => {
              if (id !== fakeId) {
                return id;
              }

              return spaceTabId;
            }),
            ...navigate && activeTabId === fakeId ? {
              activeTabId: spaceTabId,
            } : null,
          };
          
          await entityApi.space.update(spaceId, newSpace);
          dispatch(deleteEntity({ id: fakeId, type: entityNames.spaceTab }));
          // eslint-disable-next-line no-empty
        } catch (err) {
          console.log('err', err);
        }
      })
    ));
  };

export const closeTab: AppThunk<string> = (tabId) => 
  async (dispatch, getState) => {
    const spaceTab = spaceTabSelector.getById(getState(), tabId);
    const space = spaceSelector.getById(getState(), spaceTab?.spaceId);

    if (!space || !spaceTab) {
      return;
    }

    await entityApi.space.update(space.id, {
      spaceTabs: space.spaceTabs.filter(id => id !== tabId),
      ...space.activeTabId === tabId ? { activeTabId: getNextActiveTabId(space.spaceTabs, tabId) } : null,
    });
  };



export const changeActiveTab = (id: string) => async (dispatch, getState) => {
  const activeSpaceId = selectActiveSpaceId(getState());

  if (!activeSpaceId) {
    return;
  }

  await entityApi.space.update(activeSpaceId, { activeTabId: id });
};

export const fetchSpaceTabsRouteNotes: AppThunk<string> = (spaceId) => 
  async (dispatch, getState) => {
    const state = getState();
    const noteIds = selectSpaceTabs(state, spaceId)
      .map(id => spaceTabSelector.getById(state, id))
      .filter((spaceTab) => spaceTab && spaceTab.routes.length)
      .map((spaceTab) => {
        const { routes } = spaceTab!;
        return getTabMatch(routes[0]);
      })
      .filter(match => match && match.route.name === tabNames.note)
      .map(match => {

        return match!.pathMatch.params.noteId;
      });

    await api.loadNotes({ ids: noteIds });

    return [];
  };

type InitialState = {
  isOpen: boolean,
  isSideOpen: boolean,
  isPageLoading: boolean,
  activeSpaceId: string | null,
  // when user enter some link we redirect him to app and open tab with this route
  waitedRoute: string | null,
}

const initialState: InitialState = {
  isOpen: false,
  isSideOpen: false,
  isPageLoading: false,
  activeSpaceId: null,
  waitedRoute: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    startPageLoading: (state) => {
      state.isPageLoading = true;
    },
    stopPageLoading: (state) => {
      state.isPageLoading = false;
    },
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    updateActiveSpaceId: (state, { payload }: PayloadAction<string>) => {
      state.activeSpaceId = payload;
    },
    addWaitedRoute: (state, { payload }: PayloadAction<string>) => {
      state.waitedRoute = payload;
    },
    cleanWaitedRoute: (state) => {
      state.waitedRoute = null;
    },
    toggleSide: (state) => {
      state.isSideOpen = !state.isSideOpen;
    }
  },
});

export const selectActiveSpace = (state: AppState) => {
  return spaceSelector.getById(state, state.app.activeSpaceId);
};

export const selectSpaceTabs = (state: AppState, id?: string | null) => {
  return id ? state.entities.space[id]?.spaceTabs || EMPTY_ARRAY : EMPTY_ARRAY;
};

export const selectActiveSpaceTabs = (state: AppState) => {
  return selectSpaceTabs(state, selectActiveSpaceId(state));
};

export const selectSortedSpaceTabs = createSelector(
  [
    selectActiveSpaceTabs,
    (state: AppState) => state.entities.spaceTab
  ], 
  (tabs, spaceTabEntities) => {
    return tabs.slice().sort((tabA, tabB) => (spaceTabEntities[tabA]?.pos || 0) - (spaceTabEntities[tabB]?.pos || 0));
  });

  
export const selectActiveSpaceActiveTab = (state: AppState) => {
  return spaceTabSelector.getById(state, selectActiveSpace(state)?.activeTabId);
};

export const selectActiveSpaceId = (state: AppState) => {
  return state.app.activeSpaceId;
};

export const { 
  open,
  close,
  startPageLoading,
  stopPageLoading,
  updateActiveSpaceId,
  toggleSide,
  addWaitedRoute,
  cleanWaitedRoute,
} = appSlice.actions;

export default appSlice.reducer;
