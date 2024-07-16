import { AppState } from 'shared/types/store';

export const selectActiveTabId = (state: AppState) => {
  return state.app.activeTabId;
};