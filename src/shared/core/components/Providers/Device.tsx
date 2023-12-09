import React from "react";
import { useQuery } from '@chakra-ui/react';
import { useMedia } from 'shared/hooks/useMedia';
import { devices } from "shared/constants/devices";
import { useDispatch } from "react-redux";
import { updateDevice } from "shared/store/slices/appSlice";

type Props = {
  children: React.ReactNode,
}

export const Device = React.memo(({ children }: Props) => {
  const query = useQuery({ below: 'sm' });
  const dispatch = useDispatch();
  // standard media initialized with wrong values
  const [isMobile, initialized] = useMedia(query, () => {
    dispatch(updateDevice(isMobile ? devices.MOBILE : devices.DESKTOP));
  });

  if (!initialized) {
    return null;
  }
  
  return children;
});