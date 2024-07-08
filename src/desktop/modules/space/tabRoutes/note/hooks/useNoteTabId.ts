import { useLocation, useParams } from '@tanstack/react-router';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

export const useNoteTabId = () => {
  const tab = useTabContext();
  const { state: { key } } = useLocation();
  const { noteId = '' } = useParams({ strict: false });
  
  return `${key}${tab.id}${noteId}`;
};
