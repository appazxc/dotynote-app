import React from 'react';
import Loadable from 'shared/components/Loadable';
import { useAppDispatch } from 'shared/store/hooks';
import { getMe } from 'shared/store/slices/authSlice';

const MainDesktop = Loadable(() => import(/* webpackChunkName: "MainDesktop" */ 'desktop/containers/Main'));
const MainMobile = Loadable(() => import(/* webpackChunkName: "MainMobile" */ 'mobile/containers/Main'));

type Props = {
  isMobile: boolean,
}

export const Main = ({ isMobile }: Props) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getMe());
  }, []);

  return (
    isMobile ? <MainMobile /> : <MainDesktop />
  );
};
