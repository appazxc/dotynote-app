import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { deleteEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { removePostIdsFromStickTypeQuery } from 'shared/util/api/removePostIdsFromStickTypeQuery';

export const unstickPosts = (parentId: string, postIds: string[]): ThunkAction => 
  async (dispatch) => {
    const revert = removePostIdsFromStickTypeQuery(parentId, postIds, false);

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