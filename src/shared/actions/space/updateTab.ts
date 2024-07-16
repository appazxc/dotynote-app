import find from 'lodash/find';
import findLast from 'lodash/findLast';

import { entityApi } from 'shared/api/entityApi';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

export const updateTab = ({ id, data }: { id: string, data: Partial<SpaceTabEntity>}) => 
  async (dispatch, getState) => {
    const oldTab = spaceTabSelector.getById(getState(), id);
    const activeSpace = selectActiveSpace(getState());

    if (!oldTab || !activeSpace) return;

    const posData: { pos?: SpaceTabEntity['pos'] } = {};

    if ('isPinned' in data) {
      const { isPinned } = data;
      const tabIds = activeSpace.tabs;
      const sortedTabs = selectSortedTabs(getState(), { ids: tabIds });
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
  };