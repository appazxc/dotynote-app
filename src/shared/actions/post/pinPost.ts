import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export const pinPost = (postId: string): ThunkAction =>
  async (dispatch) => {
    const revert = dispatch(updateEntity({ 
      id: postId,
      type: entityNames.post,
      data: { pinnedAt: new Date().toISOString() },
    }));

    try {
      await api.post<string>(`/posts/${postId}/pin`, {});
    } catch (error) {
      revert();
    }
  };
