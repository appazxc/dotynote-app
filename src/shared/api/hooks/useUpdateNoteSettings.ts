import { useMutation } from '@tanstack/react-query';

import { entityApi } from 'shared/api/entityApi';
import { NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';

export const updateUserMutationKey = (noteSettingsId: string) => ['noteSettings', noteSettingsId];

export const useUpdateNoteSettings = (noteId: number, noteSettingsId: string) => {
  return useMutation({
    mutationKey: updateUserMutationKey(noteSettingsId),
    mutationFn: (settings: Partial<NoteSettingsEntity>) => {
      return entityApi.note.updateSettings(noteId, noteSettingsId, settings);
    },
  });
};
