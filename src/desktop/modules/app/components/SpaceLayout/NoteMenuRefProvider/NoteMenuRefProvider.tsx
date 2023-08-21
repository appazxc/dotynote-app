import React from 'react';

import { NoteMenuRefContext } from './NoteMenuRefContext';

type Props = {
  children: React.ReactNode,
  noteRef: React.RefObject<HTMLDivElement>,
}

export const NoteMenuRefProvider = ({ children, noteRef }: Props) => {
  return (
    <NoteMenuRefContext.Provider value={noteRef}>
      {children}
    </NoteMenuRefContext.Provider>
  );
};