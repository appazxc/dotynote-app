import store2 from 'store2';

export const removeAudioTime = (audioId: string | null | undefined) => {
  if (!audioId) {
    return;
  }

  const audioTime = store2.namespace('audioTime');
  audioTime.remove(audioId);
};
