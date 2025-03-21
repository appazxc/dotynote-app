import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from 'shared/components/ui/toaster';
import config from 'shared/config';
import { AudioController } from 'shared/modules/noteAudio/AudioController';

import { Main } from './Main';
import { Providers } from './Providers';

export default function Core () {
  return (
    <Providers>
      <Main />
      <Toaster />
      <AudioController />
      {config.devtools.query && <ReactQueryDevtools initialIsOpen />}
    </Providers>
  );
}
