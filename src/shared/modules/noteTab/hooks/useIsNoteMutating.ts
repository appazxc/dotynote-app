import { useIsMutating } from '@tanstack/react-query';

import { deleteNoteMutationKey } from 'shared/api/hooks/useDeleteNote';
import { updateNoteMutationKey } from 'shared/api/hooks/useUpdateNote';

export const useIsNoteMutating = (id: number) => {
  const isUpdatingNote = useIsMutating({ mutationKey: updateNoteMutationKey() });
  const isDeletingNote = useIsMutating({ mutationKey: deleteNoteMutationKey(id) });

  return isUpdatingNote || isDeletingNote;
};
