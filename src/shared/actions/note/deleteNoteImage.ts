import { api } from 'shared/api';
import { entityTypes } from 'shared/constants/entityTypes';
import { noteSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export type DeleteNoteImageParams = {
  imageId: string,
  noteId: number,
}

export const deleteNoteImage = ({ imageId, noteId }: DeleteNoteImageParams): ThunkAction => 
  async (dispatch, getState) => {
    dispatch(updateEntity({ id: imageId, type: entityTypes.noteImage, data: { _isDeleted: true } }));
  
    try {
      await api.delete(`/notes/${noteId}/images/${imageId}`);
    
      const note = noteSelector.getById(getState(), noteId) || { images: [] };

      dispatch(updateEntity({ 
        id: noteId, 
        type: entityTypes.note, 
        data: { images: note.images.filter(id => imageId !== id) }, 
      }));

      dispatch(deleteEntity({ id: imageId, type: entityTypes.noteImage }));
    } catch (error) {
      dispatch(updateEntity({ id: imageId, type: entityTypes.noteImage, data: { _isDeleted: false } }));
      throw error;
    }
  };