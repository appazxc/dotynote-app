import { useIsMutating } from '@tanstack/react-query';

import { deleteNoteMutationKey } from 'shared/api/hooks/useDeleteNotes';
import { updateNoteMutationKey } from 'shared/api/hooks/useUpdateNote';

export const useIsNoteMutating = () => {
  const isUpdatingNote = useIsMutating({ mutationKey: updateNoteMutationKey() });
  const isDeletingNote = useIsMutating({ mutationKey: deleteNoteMutationKey() });

  return isUpdatingNote || isDeletingNote;
};
