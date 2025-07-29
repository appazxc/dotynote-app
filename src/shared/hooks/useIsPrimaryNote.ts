import { useBrowserLocation } from 'shared/hooks/useBrowserLocation';

import { PRIMARY_NOTE_PATH } from 'mobile/routes/primaryNote/primaryNotePath';

export const useIsPrimareNote = () => {
  const { pathname } = useBrowserLocation();

  return pathname === PRIMARY_NOTE_PATH;
};