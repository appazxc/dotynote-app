import { Loader } from 'shared/constants/loaderIds';
import { useAppSelector } from 'shared/store/hooks';

import { selectIsLoadersInProgress } from '../loadersSlice';

export const useLoaders = (loaderIds: Loader[]) => {
  return useAppSelector(state => selectIsLoadersInProgress(state, loaderIds));
};
