import { spaceTabSelector } from 'shared/selectors/entities';
import { AppState } from 'shared/types/store';

import { selectPrimaryNoteTabId } from 'mobile/selectors/app/selectPrimaryNoteTabId';

export const selectPrimaryNoteTab = (state: AppState) => {
  const tabId = selectPrimaryNoteTabId(state);
  
  return spaceTabSelector.getById(state, tabId);
};
