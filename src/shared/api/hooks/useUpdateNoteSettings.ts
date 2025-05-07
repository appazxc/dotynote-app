import { useMutation } from '@tanstack/react-query';

import { entityApi } from 'shared/api/entityApi';
import { noteSettingsSelector } from 'shared/selectors/entities';
import { NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';

export const updateUserMutationKey = (noteSettingsId: string) => ['noteSettings', noteSettingsId];

export const useUpdateNoteSettings = (noteId: string, noteSettingsId: string) => {
  return useMutation({
    mutationKey: updateUserMutationKey(noteSettingsId),
    mutationFn: (settings: Partial<NoteSettingsEntity>) => {
      return entityApi.note.updateRelation(`/${noteId}/settings`, noteSettingsId, settings, noteSettingsSelector);
    },
  });
};
