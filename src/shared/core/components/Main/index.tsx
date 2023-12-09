import { ContentLoader } from 'shared/components/ContentLoader';
import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/store/hooks';
import { selectIsMobile } from 'shared/store/slices/appSlice';

const MainDesktop = Loadable(
  () => import('desktop/core/Main'), { fallback: <ContentLoader /> });
const MainMobile = Loadable(
  () => import('mobile/core/Main'), { fallback: <ContentLoader /> });

export const Main = () => {
  const isMobile = useAppSelector(selectIsMobile);
  console.log('isMobile', isMobile);
  
  return (
    isMobile ? <MainMobile /> : <MainDesktop />
  );
};
