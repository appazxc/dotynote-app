import React from 'react';

import { NoteContext } from './NoteContext';

type Props = {
  children: React.ReactNode,
  id: number,
}

export const NoteProvider = ({ children, id }: Props) => {
  return (
    <NoteContext.Provider value={id}>
      {children}
    </NoteContext.Provider>
  );
};