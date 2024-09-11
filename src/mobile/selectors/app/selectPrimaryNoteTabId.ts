import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { AppState } from 'shared/types/store';

export const selectPrimaryNoteTabId = (state: AppState) => {
  const activeSpace = selectActiveSpace(state);

  if (!activeSpace || !activeSpace.mainNoteId) {
    return null;
  }

  return state.app.primaryNoteTabIds[`${activeSpace.id}|${activeSpace.mainNoteId}`];
};
