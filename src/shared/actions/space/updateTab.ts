import find from 'lodash/find';
import findLast from 'lodash/findLast';

import { entityApi } from 'shared/api/entityApi';
import { getDesktopRoutesMap, getMobileRoutesMap } from 'shared/modules/space/helpers/routesMap';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { ThunkAction } from 'shared/types/store';

export const updateTab = ({ id, data }: { id: string; data: Partial<SpaceTabEntity>}): ThunkAction => 
  async (_, getState) => {
    const oldTab = spaceTabSelector.getEntityById(getState(), id);
    const activeSpace = selectActiveSpace(getState());
    const isMobile = selectIsMobile(getState());
    
    if (!oldTab || !activeSpace) return;

    const posData: { pos?: SpaceTabEntity['pos'] } = {};

    if ('isPinned' in data) {
      const { isPinned } = data;
      const sortedTabs = selectSortedTabs(getState());
      const findFunc = isPinned ? findLast : find;
      const targetTab = findFunc(sortedTabs, (tab) => tab.isPinned === isPinned);

      if (targetTab) {
        const diffAmount = isPinned ? 1000 : -1000;
        posData.pos = Math.max(targetTab.pos + diffAmount, 0);
      }
    }

    // we need to clear cached routes map when the tab is updated
    if ('routes' in data) {
      const routesMap = isMobile ? getDesktopRoutesMap() : getMobileRoutesMap();
      routesMap.set(id, null);
    }

    const entity = {
      ...data,
      ...posData,
    };

    await entityApi.spaceTab.update(id, entity);
  };