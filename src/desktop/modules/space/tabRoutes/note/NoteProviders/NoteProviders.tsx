import React from 'react';

import { EditorProvider } from 'shared/modules/editor';

type Props = React.PropsWithChildren<{
  id: string,
  isWriteMode: boolean,
}>

export const NoteProviders = React.memo(({ id, isWriteMode, children }: Props) => {
  return (
    <EditorProvider id={id} isWriteMode={isWriteMode}>
      {children}
    </EditorProvider>
  );
});
