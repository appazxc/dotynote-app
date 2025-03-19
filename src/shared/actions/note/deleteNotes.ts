import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { removePostIdsFromQuery } from 'shared/util/api/removePostIdsFromQuery';

export const deleteNotes = (noteIds: number[]): ThunkAction => 
  async (dispatch, getState) => {
    const reverts = noteIds.map((noteId) => {
      return dispatch(updateEntity({
        type: entityNames.note,
        id: noteId,
        data: {
          _isDeleted: true,
        },
      }));
    });

    try {
      await api.delete('/notes', {
        noteIds,
      });

      const postsWithDeletedNoteIds = Object
        .entries(getState().entities.post)
        .filter(([_, post]) => noteIds.includes(post.noteId))
        .map(([_, post]) => post);

      postsWithDeletedNoteIds.forEach((post) => {
        removePostIdsFromQuery(post.parentId, [post.id]);
        dispatch(updateEntity({ id: post.id, type: entityNames.post, data: { _isDeleted: true } }));
      });
    } catch(error) {
      const parsedError = parseApiError(error);
      
      if (parsedError.statusCode !== 404) {
        reverts.forEach(revert => revert());
      }
    }
  };