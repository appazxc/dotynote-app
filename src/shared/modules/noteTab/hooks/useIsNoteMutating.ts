import { useIsMutating } from '@tanstack/react-query';

import { deleteNoteMutationKey } from 'shared/api/hooks/useDeleteNotes';
import { deletePostsMutationKey } from 'shared/api/hooks/useDeleteNotesFromPosts';
import { updateNoteMutationKey } from 'shared/api/hooks/useUpdateNote';

export const useIsNoteMutating = (noteId: string) => {
  const isUpdatingNote = useIsMutating({ mutationKey: updateNoteMutationKey(noteId) });
  const isDeletingNote = useIsMutating({ mutationKey: deleteNoteMutationKey() });
  const isDeletingPosts = useIsMutating({ mutationKey: deletePostsMutationKey(noteId) });

  return isUpdatingNote || isDeletingNote || isDeletingPosts;
};
