// @ts-ignore
import React, { use } from 'react';

type Props = {
  loader: Promise<void>,
};

export const SuspenseLoader = React.memo<Props>(({ loader }) => {
  use(loader);

  return null;
});