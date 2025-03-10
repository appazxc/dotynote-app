import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { deleteEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { removePostIdsFromQuery } from 'shared/util/api/removePostIdsFromQuery';

export const unstickPosts = (parentId: number, postIds: number[]): ThunkAction => 
  async (dispatch) => {
    const revert = removePostIdsFromQuery(parentId, postIds);
console.log('parentId, postIds', parentId, postIds);
    try {
      await api.post('/posts/unstick', {
        parentId,
        postIds,
      });

      postIds.forEach((postId) => {
        dispatch(deleteEntity({ id: postId, type: entityNames.post }));
      });
    } catch(e) {
      revert();
    }
  };