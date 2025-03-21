import { AudioTimeContext } from 'shared/modules/noteAudio/AudioTimeProvider';
import { useReactContext } from 'shared/util/useReactContext';

export const useAudioTime = () => {
  const context = useReactContext(AudioTimeContext);

  return context;
};