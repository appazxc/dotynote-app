import { api } from 'shared/api';
import { entityTypes } from 'shared/constants/entityTypes';
import { noteSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export type DeleteNoteImageParams = {
  id: string,
  noteId: number,
}

export const deleteNoteImage = ({ id, noteId }: DeleteNoteImageParams): ThunkAction => async (dispatch, getState) => {
  dispatch(updateEntity({ id, type: entityTypes.noteImage, data: { _isDeleted: true } }));
  
  try {
    await api.delete(`/notes/${noteId}/images/${id}`);
    
    const note = noteSelector.getById(getState(), noteId) || { images: [] };

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