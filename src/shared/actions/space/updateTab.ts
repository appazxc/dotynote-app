import { find, findLast } from 'lodash';

import { entityApi } from 'shared/api/entityApi';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectSortedSpaceTabEntities } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

export const updateTab = ({ id, data }: { id: IdentityType, data: Partial<SpaceTabEntity>}) => 
  async (dispatch, getState) => {
    const oldTab = spaceTabSelector.getById(getState(), id);

    if (!oldTab) return;

    const spaceTabsQueryKey = options.spaceTabs.list({ spaceId: oldTab.spaceId }).queryKey;

    const posData: { pos?: SpaceTabEntity['pos'] } = {};

    if ('isPinned' in data) {
      const { isPinned } = data;
      const tabIds = queryClient.getQueryData(spaceTabsQueryKey);
      const sortedTabs = selectSortedSpaceTabEntities(getState(), { ids: tabIds });
      const findFunc = isPinned ? findLast : find;
      const targetTab = findFunc(sortedTabs, (tab) => tab.isPinned === isPinned);

      if (targetTab) {
        const diffAmount = isPinned ? 1000 : -1000;
        posData.pos = Math.max(targetTab.pos + diffAmount, 0);
      }
    }

    const entity = {
      ...data,
      ...posData,
    };

    await entityApi.spaceTab.update(id, entity);

    if (entity.pos === 0) {
      queryClient.invalidateQueries({ queryKey: spaceTabsQueryKey });
    }
  };