import { Loader } from 'shared/constants/loaderIds';
import { ThunkAction } from 'shared/types/store';

import { startLoader, stopLoader } from '../loadersSlice';

export const withLoader = (loaderId: Loader, action: ThunkAction): ThunkAction =>
  async (dispatch, getState) => {
    dispatch(startLoader(loaderId));
    let result;

    try {
      result = await dispatch(action);
    } finally {
      dispatch(stopLoader(loaderId));
    }

    return result;
  };
