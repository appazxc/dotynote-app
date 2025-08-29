import { trackEvent } from 'shared/analytics/posthog';
import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export const unpinPost = (postId: string): ThunkAction =>
  async (dispatch) => {
    const revert = dispatch(updateEntity({
      id: postId,
      type: entityNames.post,
      data: { pinnedAt: null },
    }));

    try {
      await api.post<string>(`/posts/${postId}/unpin`, {});

      // Track post unpinned
      trackEvent('post_unpinned', {
        post_id: postId,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      revert();
    }
  };
