import { noteSelector } from 'shared/selectors/entities';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { AppState } from 'shared/types/store';

export const selectNotesWithAllTypeList = (state: AppState) => {
  const { note } = state.entities;

  return Object.values(note)
    .filter((note) => !!note.postsSettings)
    .map((note) => noteSelector.getEntityById(state, note.id))
    .filter((note) => note?.postsSettings?.listType === 'all') as NoteEntity[];
};