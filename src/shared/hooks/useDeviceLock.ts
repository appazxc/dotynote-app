import { useEffect } from 'react';

import { useAppDispatch } from 'shared/store/hooks';
import { lockDevice, unlockDevice } from 'shared/store/slices/appSlice';

export const useDeviceLock = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(lockDevice());

    return () => {
      dispatch(unlockDevice());
    };
  }, [dispatch]);
};