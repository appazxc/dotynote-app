import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { postSelector } from 'shared/selectors/entities';
import { deleteEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { removePostIdsFromQuery } from 'shared/util/api/removePostIdsFromQuery';

export const deleteNotesFromPosts = (parentId: number, postIds: number[]): ThunkAction => 
  async (dispatch, getState) => {
    const posts = postSelector.getEntitiesById(getState(), postIds);
    const noteIds = posts.map((post) => post.noteId);
    const revert = removePostIdsFromQuery(parentId, postIds, false);

    try {
      await api.delete('/notes', {
        noteIds,
      });

      Object
        .entries(getState().entities.post)
        .filter(([_, post]) => 
          noteIds.includes(post.noteId) 
          && !postIds.includes(post.id) // already deleted
        )
        .map(([_, post]) => post)
        .forEach((post) => {
          removePostIdsFromQuery(post.parentId, [post.id]);
          dispatch(deleteEntity({ id: post.id, type: entityNames.post }));
        });

      noteIds.forEach((id) => {
        dispatch(deleteEntity({ id, type: entityNames.note }));
      });
    } catch(e) {
      revert();
    }
  };