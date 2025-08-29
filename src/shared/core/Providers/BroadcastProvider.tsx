import * as React from 'react';

import { useBroadcast } from 'shared/hooks/useBroadcast';

type Props = React.PropsWithChildren<{}>;

export const BroadcastProvider = React.memo(({ children }: Props) => {
  // Initialize broadcast authentication sync
  // This hook sets up listeners for cross-tab authentication events
  useBroadcast();

  return <>{children}</>;
});
