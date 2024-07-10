import { createContext } from 'react';

import { Editor } from '@tiptap/react';

export const EditorContext = createContext<{ editor: Editor } | null>(null);
