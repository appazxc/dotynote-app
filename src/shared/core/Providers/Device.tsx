import React from 'react';
import { useDispatch } from 'react-redux';

import { devices } from 'shared/constants/devices';
import { useMedia } from 'shared/hooks/useMedia';
import { useAppSelector } from 'shared/store/hooks';
import { updateDevice } from 'shared/store/slices/appSlice';

type Props = {
  children: React.ReactNode;
}

export const Device = React.memo(({ children }: Props) => {
  const dispatch = useDispatch();
  const device = useAppSelector(state => state.app.device);
  // standard media initialized with wrong values
  const [isMobileMatch] = useMedia('(max-width: 30em)');
  
  React.useEffect(() => {
    if (typeof isMobileMatch !== 'boolean') {
      return;
    }

    // only set. no update on changes
    if (!device) {
      dispatch(updateDevice(isMobileMatch ? devices.MOBILE : devices.DESKTOP));
    }
  }, [dispatch, device, isMobileMatch]);

  if (!device) {
    return null;
  }
  
  return children;
});