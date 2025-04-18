import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { selectUser } from 'shared/selectors/user/selectUser';
import { setUser } from 'shared/store/slices/authSlice';
import { ThunkAction } from 'shared/types/store';

export const loadUser = (): ThunkAction => async (dispatch, getState) => {
  const user = selectUser(getState());

  if (user) {
    return;
  }
  
  const userId = await queryClient.fetchQuery(options.users.me());
  dispatch(setUser(userId));
};