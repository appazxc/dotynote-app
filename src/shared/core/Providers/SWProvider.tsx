import React from 'react';
import { registerSW } from 'virtual:pwa-register';

import { createReactContext } from 'shared/util/createReactContext';

type Props = {
  children: React.ReactNode;
};

type UpdateSW = (reloadPage?: boolean | undefined) => Promise<void>

export const SWContext = createReactContext<{ updateSW: UpdateSW | null, isUpdateAvailable: boolean }>();

export const SWProvider = React.memo(({ children }: Props) => {
  const [isUpdateAvailable, setIsUpdateAvailable] = React.useState(false);
  const updateSW = React.useRef<UpdateSW>(null);

  React.useEffect(() => {
    updateSW.current = registerSW({
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
