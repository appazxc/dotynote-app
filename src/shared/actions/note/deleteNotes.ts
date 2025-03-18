import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { removePostIdsFromQuery } from 'shared/util/api/removePostIdsFromQuery';

export const deleteNotes = (noteIds: number[]): ThunkAction => 
  async (dispatch, getState) => {
    noteIds.forEach((noteId) => {
      dispatch(updateEntity({
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
    } catch(e) {
      noteIds.forEach((noteId) => {
        dispatch(updateEntity({
          type: entityNames.note,
          id: noteId,
          data: {
            _isDeleted: false,
          },
        }));
      });
    }
  };