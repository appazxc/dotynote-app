import React from 'react';

import { EditorProvider } from 'shared/modules/editor';
import { NoteProvider } from 'shared/modules/space/tabRoutes/note/components/NoteProvider';

type Props = React.PropsWithChildren<{
  id: number,
  isWriteMode: boolean,
}>

export const NoteProviders = React.memo(({ id, isWriteMode, children }: Props) => {
  return (
    <NoteProvider id={id}>
      <EditorProvider id={id} isWriteMode={isWriteMode}>
        {children}
      </EditorProvider>
    </NoteProvider>
  );
});
