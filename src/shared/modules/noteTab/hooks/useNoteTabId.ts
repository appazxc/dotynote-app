import { useLocation, useParams } from '@tanstack/react-router';

import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';

export const useNoteTabId = () => {
  const tab = useAppSelector(selectActiveTab);
  const { href } = useLocation();
  const { noteId = '' } = useParams({ strict: false });
  
  return `${href}${tab?.id}${noteId}`;
};
