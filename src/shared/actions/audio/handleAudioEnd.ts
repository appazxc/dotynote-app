import { setActiveAudioId } from 'shared/modules/noteAudio/audioSlice';
import { selectUser } from 'shared/selectors/auth/selectUser';
import { noteAudioSelector, noteSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';
import { removeAudioTime } from 'shared/util/audio/removeAudioTime';
import { invariant } from 'shared/util/invariant';

type Params = {
  audioId: string,
  start: (audioId?: string | null) => void,
}

export const handleAudioEnd = (params: Params): ThunkAction => async (dispatch, getState) => {
  const { audioId, start } = params;
  const state = getState();
  const user = selectUser(state);
  const audio = noteAudioSelector.getById(state, audioId);
  const note = noteSelector.getById(state, audio?.noteId);
  
  invariant(note && audio, 'Note or audio not found');

  removeAudioTime(audioId);
  
  if (!user?.settings?.autoPlayNextAudio) {
    dispatch(setActiveAudioId(null));
    return;
  }
  
  const audioIndex = note.audio.indexOf(audioId);
  if (audioIndex === -1) { 
    return;
  }
  
  const nextAudioId = note.audio[audioIndex + 1];
  // we want to start next audio from start position
  removeAudioTime(nextAudioId);
  start(nextAudioId);
};
