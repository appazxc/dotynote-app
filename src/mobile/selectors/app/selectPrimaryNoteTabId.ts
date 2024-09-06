import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { AppState } from 'shared/types/store';

export const selectPrimaryNoteTabId = (state: AppState) => {
  const activeSpace = selectActiveSpace(state);

  if (!activeSpace || !activeSpace.mainNoteId) {
    return null;
  }

  return state.app.activeSpacePrimaryNoteTabIds[`${activeSpace.id}|${activeSpace.mainNoteId}`];
};
