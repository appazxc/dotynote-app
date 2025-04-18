import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { userSettingsSelector } from 'shared/selectors/entities';
import { selectUser } from 'shared/selectors/user/selectUser';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ApiUserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

export const updateUserSettings = (settings: Partial<ApiUserSettingsEntity>): ThunkAction =>
  async (dispatch, getState) => {
    const user = selectUser(getState());
    const userSettings = userSettingsSelector.getById(getState(), user?.settings?.id);

    invariant(userSettings, 'Missing user settings');

    dispatch(updateEntity({
      type: entityNames.userSettings,
      id: userSettings.id,
      data: settings,
    }));
    
    try {
      return api.patch('/users/settings', settings);
    } catch (error) {
      dispatch(updateEntity({
        type: entityNames.userSettings,
        id: userSettings.id,
        data: userSettings,
      }));
    }
  };
