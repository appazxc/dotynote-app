import { useLocation } from '@tanstack/react-router';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

export const useNoteTabId = (noteId: string) => {
  const tab = useTabContext();
  const { href } = useLocation();
  
  return `${href}${tab?.id}${noteId}`;
};
