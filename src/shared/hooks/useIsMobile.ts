import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppSelector } from 'shared/store/hooks';

export const useIsMobile = () => {
  return useAppSelector(selectIsMobile);
};