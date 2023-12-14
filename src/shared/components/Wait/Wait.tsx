import React from 'react';

import { useTimeout } from 'usehooks-ts';

type Props = {
  delay?: number,
  children: React.ReactNode,
}

export const Wait = React.memo(({ delay = 0, children }: Props) => {
  const [visible, setVisible] = React.useState(!delay);

  const show = () => setVisible(true);

  useTimeout(show, delay);
  
  return visible ? children: null;
});