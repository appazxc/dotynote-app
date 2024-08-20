import React from 'react';

import { NoteContext } from './NoteContext';

export const useNoteContext = () => {
  const context = React.useContext(NoteContext);
  
  if (context === undefined) {
    throw new Error('useNoteContext must be within NoteProvider');
  }

  return context;
};