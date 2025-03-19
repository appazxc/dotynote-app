import { getStore } from 'shared/helpers/store/getStore';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';

const routesMapDesktop = new Map();
const routesMapMobile = new Map();

export const getRoutesMap = () => {
  const { getState } = getStore();
  const isMobile = selectIsMobile(getState());
  return isMobile ? routesMapMobile : routesMapDesktop;
};

export const getMobileRoutesMap = () => {
  return routesMapMobile;
};

export const getDesktopRoutesMap = () => {
  return routesMapDesktop;
};
