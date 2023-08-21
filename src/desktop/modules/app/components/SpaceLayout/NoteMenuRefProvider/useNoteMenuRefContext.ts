import React from 'react';

import { NoteMenuRefContext } from './NoteMenuRefContext';

export const useNoteMenuRefContext = () => {
  const context = React.useContext(NoteMenuRefContext);
  
  if (context === undefined) {
    throw new Error("useNoteMenuRefContext must be within NoteMenuRefProvider");
  }

  return context;
};