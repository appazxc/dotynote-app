import { entityNames } from 'shared/constants/entityNames';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { addPrimaryNoteTab } from 'shared/store/slices/appSlice';
import { addEntity } from 'shared/store/slices/entitiesSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { ThunkAction } from 'shared/types/store';
import { buildNoteTabPath } from 'shared/util/buildNoteTabPath';

export const createPrimaryNoteTab = (): ThunkAction => (dispatch, getState) => {
  const activeSpace = selectActiveSpace(getState());

  if (!activeSpace || !activeSpace.mainNoteId) {
    return;
  }

  const tab: SpaceTabEntity = {
    id: String(Math.random()),
    spaceId: activeSpace.id,
    routes: [buildNoteTabPath(activeSpace.mainNoteId)],
    isPinned: false,
    pos: 1,
    _isFake: true,
  };

  dispatch(addEntity({
    type: entityNames.spaceTab,
    data: tab,
  }));

  dispatch(addPrimaryNoteTab({
    spaceId: activeSpace.id,
    primaryNoteId: activeSpace.mainNoteId,
    tabId: tab.id,
  }));
};
