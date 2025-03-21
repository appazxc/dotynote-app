import store2 from 'store2';

export const getAudioTime = (audioId: string | null | undefined) => {
  if (!audioId) {
    return;
  }
  
  const audioTime = store2.namespace('audioTime');
  const time = audioTime.get(audioId) || 0;

  return time;
};
