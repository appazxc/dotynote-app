import React from 'react';

import { ScrollContext } from './ScrollContext';

type Props = {
  children: (ref: React.RefObject<HTMLDivElement> | null) => React.ReactNode
}

export const ScrollProvider = ({ children }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <ScrollContext.Provider value={ref}>
      {children(ref)}
    </ScrollContext.Provider>
  );
};