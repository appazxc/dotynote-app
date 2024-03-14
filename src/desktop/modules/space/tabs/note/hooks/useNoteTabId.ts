import { useLocation, useParams } from 'react-router';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

export const useNoteTabId = () => {
  const tab = useTabContext();
  const { key } = useLocation();
  const { noteId = '' } = useParams();
  
  return `${key}${tab.id}${noteId}`;
};
