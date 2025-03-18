import { useMutation } from '@tanstack/react-query';

import { updateUserSettings } from 'shared/actions/user/updateUserSettings';
import { useAppDispatch } from 'shared/store/hooks';
import { ApiUserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';

export const updateUserSettingsMutationKey = () => ['userSettings'];

export const useUpdateUserSettings = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationKey: updateUserSettingsMutationKey(),
    mutationFn: (settings: Partial<ApiUserSettingsEntity>) => {
      return dispatch(updateUserSettings(settings));
    },
  });
};
