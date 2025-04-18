import { setActiveAudioId } from 'shared/modules/noteAudio/audioSlice';
import { noteAudioSelector, noteSelector } from 'shared/selectors/entities';
import { selectUser } from 'shared/selectors/user/selectUser';
import { ThunkAction } from 'shared/types/store';
import { removeAudioTime } from 'shared/util/audio/removeAudioTime';
import { invariant } from 'shared/util/invariant';

type Params = {
  audioId: string,
  start: (audioId?: string | null) => void,
  stop: () => void,
}

export const handleAudioEnd = (params: Params): ThunkAction => async (dispatch, getState) => {
  const { audioId, start, stop } = params;
  const state = getState();
  const user = selectUser(state);
  const audio = noteAudioSelector.getById(state, audioId);
  const note = noteSelector.getById(state, audio?.noteId);
  
  invariant(note && audio, 'Note or audio not found');

  removeAudioTime(audioId);
  
  const audioIndex = note.audio.indexOf(audioId);
  const nextAudioId = note.audio[audioIndex + 1];

  if (!user?.settings?.autoPlayNextAudio || audioIndex === -1 || !nextAudioId) { 
    stop();
    return;
  }
  
  // we want to start next audio from start position
  removeAudioTime(nextAudioId);
  start(nextAudioId);
};
