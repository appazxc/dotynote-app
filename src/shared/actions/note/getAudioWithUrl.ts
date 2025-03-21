import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { noteAudioSelector } from 'shared/selectors/entities';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ApiNoteAudioEntity } from 'shared/types/entities/NoteAudioEntity';
import { ThunkAction } from 'shared/types/store';

export const getAudioWithUrl = (audioId: string): ThunkAction<Promise<ApiNoteAudioEntity | null>> => 
  async (dispatch, getState) => {
    const audio = noteAudioSelector.getById(getState(), audioId);

    if (!audio) {
      return null;
    }

    if (!audio.url) {
      try {
        const url = await api.get<string>(`/notes/audio/${audioId}/signed-url`);

        dispatch(updateEntity({
          type: entityNames.noteAudio,
          id: audioId,
          data: { 
            url,
          },
        }));
      } catch (error) {
        console.error(error);

        return null;
      }
  
    }

    const updatedAudio = noteAudioSelector.getById(getState(), audioId);

    return updatedAudio;
  };