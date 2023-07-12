import React from 'react';
import Loadable from 'shared/components/Loadable';

const MainDesktop = Loadable(() => import(/* webpackChunkName: "MainDesktop" */ 'desktop/containers/Main'));
const MainMobile = Loadable(() => import(/* webpackChunkName: "MainMobile" */ 'mobile/containers/Main'));

type Props = {
  isMobile: boolean,
}

export const Main = ({ isMobile }: Props) => {
  return (
    isMobile ? <MainMobile /> : <MainDesktop />
  );
};
