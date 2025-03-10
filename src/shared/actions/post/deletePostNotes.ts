import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { postSelector } from 'shared/selectors/entities';
import { deleteEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { removePostIdsFromQuery } from 'shared/util/api/removePostIdsFromQuery';

export const deletePostsNotes = (parentId: number, postIds: number[]): ThunkAction => 
  async (dispatch, getState) => {
    const posts = postSelector.getEntitiesById(getState(), postIds);

    const noteIds = posts.map((post) => post.note.id);
    const revert = removePostIdsFromQuery(parentId, postIds);

    try {
      await api.delete('/notes', {
        noteIds,
      });

      const postsWithDeletedNoteIds = Object
        .entries(getState().entities.post)
        .filter(([_, post]) => noteIds.includes(post.note))
        .map(([_, post]) => post);

      postsWithDeletedNoteIds.forEach((post) => {
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