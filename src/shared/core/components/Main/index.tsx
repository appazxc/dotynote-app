import { useQuery } from '@chakra-ui/react';
import React from 'react';
import { ContentLoader } from 'shared/components/ContentLoader';
import Loadable from 'shared/components/Loadable';
import { useMedia } from 'shared/hooks/useMedia';

const MainDesktop = Loadable(
  () => import('desktop/core/Main'), { fallback: <ContentLoader /> });
const MainMobile = Loadable(
  () => import('mobile/core/Main'), { fallback: <ContentLoader /> });

export const Main = () => {
  const query = useQuery({ below: 'sm' });
  // standard media initialized with wrong values
  const [isMobile, initialized] = useMedia(query);

  if (!initialized) {
    return null;
  }

  return (
    isMobile ? <MainMobile /> : <MainDesktop />
  );
};
