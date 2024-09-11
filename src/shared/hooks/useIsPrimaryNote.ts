import { useBrowserLocation } from 'shared/hooks/useBrowserLocation';

export const useIsPrimareNote = () => {
  const { pathname } = useBrowserLocation();

  return pathname === '/app/primary';
};