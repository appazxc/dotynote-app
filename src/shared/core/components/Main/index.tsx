import React from 'react';
import { ContentLoader } from 'shared/components/ContentLoader';
import Loadable from 'shared/components/Loadable';
import { useIsMobile } from 'shared/hooks/useIsMobile';

const MainDesktop = Loadable(
  () => import('desktop/core/Main'), { fallback: <ContentLoader /> });
const MainMobile = Loadable(
  () => import('mobile/core/Main'), { fallback: <ContentLoader /> });

export const Main = () => {
  const isMobile = useIsMobile();

  return (
    isMobile ? <MainMobile /> : <MainDesktop />
  );
};
