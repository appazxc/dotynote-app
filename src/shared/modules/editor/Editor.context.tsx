import React, { createContext } from 'react';

import { Editor } from '@tiptap/react';

const EditorContext = createContext<Editor | null>(null);

export const EditorProvider = ({ children, editor }) => {
  if (!editor) {
    return null;
  }
  
  return (
    <EditorContext.Provider value={editor}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  const context = React.useContext(EditorContext);
  
  if (context === null) {
    throw new Error('useEditorContext must be within EditorProvider');
  }

  return context;
};