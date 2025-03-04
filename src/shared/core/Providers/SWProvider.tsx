import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

import { createReactContext } from 'shared/util/createReactContext';

type Props = {
  children: React.ReactNode;
};

const intervalMS = 60 * 60 * 1000;

type UpdateSW = (reloadPage?: boolean | undefined) => Promise<void>

export const SWContext = createReactContext<{ updateSW: UpdateSW | null, isUpdateAvailable: boolean }>();

export const SWProvider = React.memo(({ children }: Props) => {
  const [isUpdateAvailable, setIsUpdateAvailable] = React.useState(false);

  const { updateServiceWorker } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      if (r) {
        setInterval(async () => {
          if (r.installing || !navigator)
            return;
    
          if (('connection' in navigator) && !navigator.onLine)
            return;
    
          const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
              'cache': 'no-store',
              'cache-control': 'no-cache',
            },
          });
    
          if (resp?.status === 200)
            await r.update();
        }, intervalMS);
      }
    },
    onNeedRefresh() {
      setIsUpdateAvailable(true);
    },
    onOfflineReady() {},
  });

  return (
    <SWContext.Provider value={{ updateSW: updateServiceWorker, isUpdateAvailable }}>
      {children}
    </SWContext.Provider>
  );
});
