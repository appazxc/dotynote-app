import { useBrowserLocation } from 'shared/components/BrowserLocationProvider';

export const useIsPrimareNote = () => {
  const { pathname } = useBrowserLocation();

  return pathname === '/app/primary';
};