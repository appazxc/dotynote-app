import { useNoteContext } from 'shared/modules/space/tabRoutes/note/components/NoteProvider';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const useTabNote = () => {
  const noteId = useNoteContext();
  const note = useAppSelector(state => noteSelector.getById(state, noteId));

  invariant(note, 'Missing note in useTabNote');
  
  return note;
};