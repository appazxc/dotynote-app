import { entityNames } from 'shared/constants/entityNames';
import { postDotSelector, postSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export const removePostDot = (dotId: string): ThunkAction => 
  async (dispatch, getState) => {
    const dot = postDotSelector.getById(getState(), dotId);
    const post = postSelector.getById(getState(), dot?.postId);

    if (!post) {
      return;
    }
    
    dispatch(updateEntity({ 
      type: entityNames.post, 
      id: post.id, 
      data: {
        dots: post.dots.filter((id) => id !== dotId),
      },
    }));

    dispatch(deleteEntity({
      type: entityNames.postDot,
      id: dotId,
    }));
  };