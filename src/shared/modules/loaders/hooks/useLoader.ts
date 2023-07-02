import { Loader } from 'shared/constants/loaderIds';
import { useAppSelector } from 'shared/store/hooks';

import { selectIsLoaderInProgress } from '../loadersSlice';

export const useLoader = (loaderId: Loader) => {
  return useAppSelector(state => selectIsLoaderInProgress(state, loaderId));
};
