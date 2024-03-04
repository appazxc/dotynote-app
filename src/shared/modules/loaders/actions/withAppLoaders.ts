import { Loader } from 'shared/constants/loaderIds';
import { ThunkAction } from 'shared/types/store';

import { startAppLoader, stopAppLoader } from '../loadersSlice';

export const withAppLoader = (loaderId: Loader, action: ThunkAction): ThunkAction =>
  async (dispatch, getState) => {
    dispatch(startAppLoader(loaderId));
    let result;

    try {
      result = await dispatch(action);
    } finally {
      dispatch(stopAppLoader(loaderId));
    }

    return result;
  };
