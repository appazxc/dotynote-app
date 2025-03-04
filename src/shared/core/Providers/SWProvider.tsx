import React from 'react';
import { registerSW } from 'virtual:pwa-register';

import { createReactContext } from 'shared/util/createReactContext';

type Props = {
  children: React.ReactNode;
};

const intervalMS = 60 * 1000;

type UpdateSW = (reloadPage?: boolean | undefined) => Promise<void>

export const SWContext = createReactContext<{ updateSW: UpdateSW | null, isUpdateAvailable: boolean }>();

export const SWProvider = React.memo(({ children }: Props) => {
  const [isUpdateAvailable, setIsUpdateAvailable] = React.useState(false);
  const updateSW = React.useRef<UpdateSW>(null);

  React.useEffect(() => {
    updateSW.current = registerSW({
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
  }, []);

  return (
    <SWContext.Provider value={{ updateSW: updateSW.current, isUpdateAvailable }}>
      {children}
    </SWContext.Provider>
  );
});
