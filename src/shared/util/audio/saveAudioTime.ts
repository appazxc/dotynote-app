import store2 from 'store2';

export const saveAudioTime = (audioId: string | null | undefined, time: number) => {
  if (!audioId) {
    return;
  }

  const audioTime = store2.namespace('audioTime');
  audioTime.set(audioId, time);
};
