import React from 'react';
import Loadable from 'shared/components/Loadable';

const MainDesktop = Loadable(() => import(/* webpackChunkName: "MainDesktop" */ 'desktop/core/Main'));
const MainMobile = Loadable(() => import(/* webpackChunkName: "MainMobile" */ 'mobile/core/Main'));

type Props = {
  isMobile: boolean,
}

export const Main = ({ isMobile }: Props) => {
  return (
    isMobile ? <MainMobile /> : <MainDesktop />
  );
};
