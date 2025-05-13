import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { useAppDispatch } from 'shared/store/hooks';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { NoteFiltersEntity } from 'shared/types/entities/NoteFiltersEntity';

export const useUpdatePostsSettingsFiltersMutationKey = (id: string) => ['note', id, 'postsSettings', 'filters'];

export const useUpdatePostsSettingsFilters = (noteId: string, id: string) => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationKey: useUpdatePostsSettingsFiltersMutationKey(id),
    mutationFn: (data: Partial<NoteFiltersEntity>) => {
      const revert = dispatch(updateEntity({
        type: entityNames.noteFilters,
        id,
        data,
      }));

      try {
        return api.patch(`/notes/${noteId}/posts-settings/filters`, data);
      } catch(error){
        revert();
        throw error;
      }
    },
  });
};
