import { entityTypes } from 'shared/constants/entityTypes';
import { postDotSelector, postSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export type UpdateDotParams = {
  action: 'click' | 'longPress',
  dotId: string
}

export const removePostDot = (dotId): ThunkAction => 
  async (dispatch, getState) => {
    const dot = postDotSelector.getById(getState(), dotId);
    const post = postSelector.getById(getState(), dot?.postId);

    if (!post) {
      return;
    }
    
    dispatch(updateEntity({ 
      type: entityTypes.post, 
      id: dotId, 
      data: {
        dots: post.dots.filter((id) => id !== dotId),
      },
    }));

    dispatch(deleteEntity({
      type: entityTypes.postDot,
      id: dotId,
    }));
  };