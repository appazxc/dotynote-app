import { useLocation, useParams } from '@tanstack/react-router';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

export const useNoteTabId = () => {
  const tab = useTabContext();
  const { href } = useLocation();
  const { noteId = '' } = useParams({ strict: false });
  
  return `${href}${tab.id}${noteId}`;
};
