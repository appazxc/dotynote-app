import { removePostDot } from 'shared/actions/post/removePostDot';
import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
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
  amount: -1 | 1;
  dotId: string;
}

export const updatePostDot = ({ amount, dotId }: UpdateDotParams): ThunkAction =>
  async (dispatch, getState) => {
    const dot = postDotSelector.getById(getState(), dotId);

    invariant(dot, 'Missing dot');

    const { my, total } = dot;
    let newAmount = 0;

    if (my === 0) {
      newAmount = amount;
    }
  
    const newTotal = getNewTotal(total, my, newAmount);
    const isDeleted = newTotal === 0;

    try {
      dispatch(updateEntity({ 
        type: entityNames.postDot, 
        id: dotId, 
        data: {
          my: amount,
          total: newTotal,
          _isDeleted: isDeleted,
        },
      }));
        
      const result = await api.patch<string>('/dots/post', { dotId, amount: newAmount, postId: dot.postId });

      if (isDeleted) {
        dispatch(removePostDot(dotId));
      }

      return result;
    } catch(error) {
      dispatch(updateEntity({ 
        type: entityNames.postDot, 
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
