import React from 'react';

import { EditorProvider } from 'shared/modules/editor';
import { IdentityType } from 'shared/types/entities/BaseEntity';

type Props = React.PropsWithChildren<{
  id: IdentityType,
  isWriteMode: boolean,
}>

export const NoteProviders = React.memo(({ id, isWriteMode, children }: Props) => {
  return (
    <EditorProvider id={id} isWriteMode={isWriteMode}>
      {children}
    </EditorProvider>
  );
});
