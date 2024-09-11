import { useMutation } from '@tanstack/react-query';

import { api } from 'shared/api';
import { ApiUserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';

export const updateUserSettingsMutationKey = () => ['userSettings'];

export const useUpdateUserSettings = () => {
  return useMutation({
    mutationKey: updateUserSettingsMutationKey(),
    mutationFn: (settings: Partial<ApiUserSettingsEntity>) => {
      return api.patch('/users/settings', settings);
    },
  });
};
