import Loadable from 'shared/components/Loadable';
import { useAppSelector } from 'shared/store/hooks';
import { selectIsMobile } from 'shared/store/slices/appSlice';

const MainDesktop = Loadable(
  () => import('desktop/core/Main'));
const MainMobile = Loadable(
  () => import('mobile/core/Main'));

export const Main = () => {
  const isMobile = useAppSelector(selectIsMobile);
  
  return (
    isMobile ? <MainMobile /> : <MainDesktop />
  );
};
