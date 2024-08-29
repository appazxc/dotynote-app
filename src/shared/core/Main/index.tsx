import Loadable from 'shared/components/Loadable';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppSelector } from 'shared/store/hooks';

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
