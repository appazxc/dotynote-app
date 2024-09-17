import { queryClient } from 'shared/api/queryClient';
import { actions } from 'shared/constants/actions';
import { persistor } from 'shared/store';
import { ThunkAction } from 'shared/types/store';

export const logout = (): ThunkAction => async (dispatch) => {
  persistor.purge();
  
  queryClient.removeQueries();
  
  dispatch({
    type: actions.RESET_APP,
  });
};