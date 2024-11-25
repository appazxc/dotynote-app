import { removePostDot } from 'shared/actions/post/removePostDot';
import { api } from 'shared/api';
import { entityTypes } from 'shared/constants/entityTypes';
import { postDotSelector } from 'shared/selectors/entities';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

const getNewTotal = (total, my, amount) => {
  if (my === 0) {
    return total + amount;
  }

  if (my < 0) {
    return total + 1;
  }

  return total - 1;
};

export type UpdateDotParams = {
  action: 'click' | 'longPress',
  dotId: string,
}

export const updatePostDot = ({ action, dotId }: UpdateDotParams): ThunkAction =>
  async (dispatch, getState) => {
    const dot = postDotSelector.getById(getState(), dotId);

    invariant(dot, 'Missing dot');

    const { my, total } = dot;
    let amount = 0;

    if (my === 0) {
      amount = action === 'click' ? 1 : -1;
    }
  
    const newTotal = getNewTotal(total, my, amount);
    const isDeleted = newTotal === 0;

    try {
      dispatch(updateEntity({ 
        type: entityTypes.postDot, 
        id: dotId, 
        data: {
          my: amount,
          total: newTotal,
          _isDeleted: isDeleted,
        },
      }));
        
      const result = await api.patch<string>('/dots/post', { dotId, amount, postId: dot.postId });

      if (isDeleted) {
        dispatch(removePostDot(dotId));
      }

      return result;
    } catch(error) {
      dispatch(updateEntity({ 
        type: entityTypes.postDot, 
        id: dotId, 
        data: {
          my,
          total,
          _isDeleted: false,
        }, 
      }));

      throw error;
    }
  };
