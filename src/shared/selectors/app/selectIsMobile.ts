import { devices } from 'shared/constants/devices';
import { AppState } from 'shared/types/store';

export const selectIsMobile = (state: AppState) => {
  return state.app.device === devices.MOBILE;
};