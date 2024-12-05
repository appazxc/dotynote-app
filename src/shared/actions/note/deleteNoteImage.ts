import { api } from 'shared/api';
import { entityTypes } from 'shared/constants/entityTypes';
import { noteSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

export type DeleteNoteImageParams = {
  id: string,
  noteId: number,
}

export const deleteNoteImage = ({ id, noteId }: DeleteNoteImageParams): ThunkAction => async (dispatch, getState) => {
  const note = noteSelector.getById(getState(), noteId);

  invariant(note, 'Missing note');

  dispatch(updateEntity({ id, type: entityTypes.noteImage, data: { _isDeleted: true } }));

  try {
    await api.delete(`/note/${noteId}/images/${id}`);

    dispatch(updateEntity({ 
      id: noteId, 
      type: entityTypes.note, 
      data: { images: note.images.filter(imageId => imageId !== id) }, 
    }));

    dispatch(deleteEntity({ id, type: entityTypes.noteImage }));
  } catch (error) {
    dispatch(updateEntity({ id, type: entityTypes.noteImage, data: { _isDeleted: false } }));
    throw error;
  }
};