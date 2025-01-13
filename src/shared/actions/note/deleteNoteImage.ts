import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { noteSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export type DeleteNoteImageParams = {
  imageId: string,
  noteId: number,
}

export const deleteNoteImage = ({ imageId, noteId }: DeleteNoteImageParams): ThunkAction => 
  async (dispatch, getState) => {
    dispatch(updateEntity({ id: imageId, type: entityNames.noteImage, data: { _isDeleted: true } }));
  
    try {
      await api.delete(`/notes/${noteId}/images/${imageId}`);
    
      const note = noteSelector.getById(getState(), noteId) || { images: [] };

      dispatch(updateEntity({ 
        id: noteId, 
        type: entityNames.note, 
        data: { images: note.images.filter(id => imageId !== id) }, 
      }));

      dispatch(deleteEntity({ id: imageId, type: entityNames.noteImage }));
    } catch (error) {
      dispatch(updateEntity({ id: imageId, type: entityNames.noteImage, data: { _isDeleted: false } }));
      throw error;
    }
  };