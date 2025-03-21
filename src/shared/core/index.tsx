import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from 'shared/components/ui/toaster';
import config from 'shared/config';
import { AudioErrorToaster } from 'shared/modules/noteAudio/AudioErrorToaster';

import { Main } from './Main';
import { Providers } from './Providers';

export default function Core () {
  return (
    <Providers>
      <Main />
      <Toaster />
      <AudioErrorToaster />
      {config.devtools.query && <ReactQueryDevtools initialIsOpen />}
    </Providers>
  );
}
