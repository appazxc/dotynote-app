import React from 'react';

import { EditorContext } from './EditorContext';

export const useEditorContext = () => {
  const context = React.useContext(EditorContext);

  if (context === null) {
    throw new Error('useEditorContext must be within EditorProvider');
  }

  return context.editor;
};