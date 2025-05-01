import { loadUser } from 'shared/actions/user/loadUser';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { ThunkAction } from 'shared/types/store';

export const loadUserData = (): ThunkAction => async (dispatch) => {
  await Promise.all([
    dispatch(loadUser()),
    queryClient.fetchQuery(options.users.userBalance()),
  ]);
};