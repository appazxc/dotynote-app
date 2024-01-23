import { entityApi } from "shared/api/entityApi";
import { queries } from "shared/api/queries";
import { queryClient } from "shared/api/queryClient";
import { getNextActiveTabId } from "shared/helpers/space/getNextActiveTabId";
import { spaceTabSelector } from "shared/selectors/entities";
import { ThunkAction } from "shared/store";
import { selectActiveTabId, updateActiveTabId } from "shared/store/slices/appSlice";

export const closeTab =
  (tabId: string): ThunkAction =>
    async (dispatch, getState) => {
      const spaceTab = spaceTabSelector.getById(getState(), tabId);
      const activeTabId = selectActiveTabId(getState());

      if (!spaceTab) {
        return;
      }

      if (activeTabId && activeTabId === tabId) {
        const nextTabId = getNextActiveTabId(
          await queryClient.fetchQuery(queries.spaceTabs.list({ spaceId: spaceTab.spaceId })),
          tabId
        );
        dispatch(updateActiveTabId(nextTabId));
      }

      queryClient.setQueryData(
        queries.spaceTabs.list({ spaceId: spaceTab.spaceId }).queryKey, 
        (oldTabs = []) => oldTabs.filter(spaceTabId => spaceTabId !== tabId)
      );

      await entityApi.spaceTab.delete(tabId);
    };
