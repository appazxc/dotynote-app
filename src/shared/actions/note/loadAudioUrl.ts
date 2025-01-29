import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export const loadAudioUrl = (audioId: string): ThunkAction => 
  async (dispatch) => {
    const url = await api.get<string>(`/notes/audio/${audioId}/signed-url`);

    dispatch(updateEntity({
      type: entityNames.noteAudio,
      id: audioId,
      data: { 
        url,
      },
    }));
  };