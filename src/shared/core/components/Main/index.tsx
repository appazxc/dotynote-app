import React from 'react';
import { ContentLoader } from 'shared/components/ContentLoader';
import Loadable from 'shared/components/Loadable';

const MainDesktop = Loadable(
  () => import(/* webpackChunkName: "MainDesktop" */ 'desktop/core/Main'), { fallback: <ContentLoader /> });
const MainMobile = Loadable(
  () => import(/* webpackChunkName: "MainMobile" */ 'mobile/core/Main'), { fallback: <ContentLoader /> });

type Props = {
  isMobile: boolean,
}

export const Main = ({ isMobile }: Props) => {
  return (
    isMobile ? <MainMobile /> : <MainDesktop />
  );
};
