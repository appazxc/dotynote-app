import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { postSelector } from 'shared/selectors/entities';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export const deletePostNotes = (parentId: number, postIds: number[]): ThunkAction => async (dispatch, getState) => {
  const posts = postSelector.getEntitiesById(getState(), postIds);
  
  const result = await api.post('/posts/delete-notes', {
    parentId,
    postIds,
  });
    
  posts.map((post) => post.note.id).forEach((id) => {
    dispatch(updateEntity({ id, type: entityNames.note, data: { _isDeleted: true } }));
  });

  return result;
};