import React from 'react';

import { NoteMenuRefContext } from './NoteMenuRefContext';

type Props = {
  children: React.ReactNode,
}

export const NoteMenuRefProvider = ({ children }: Props) => {
  const noteMenuRef = React.useRef<HTMLDivElement>(null);

  return (
    <NoteMenuRefContext.Provider value={noteMenuRef}>
      {children}
    </NoteMenuRefContext.Provider>
  );
};