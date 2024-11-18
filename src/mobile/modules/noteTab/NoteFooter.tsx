import React from 'react';

import { Container } from '@chakra-ui/react';

import { useEditorContext } from 'shared/modules/editor';
import { Operations } from 'shared/modules/noteTab/components/Operations';
import { selectIsOperationActive } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

import { NoteDialogs } from 'mobile/modules/noteTab/NoteDialogs';
import { NoteEditorControls } from 'mobile/modules/noteTab/NoteEditorControls';
import { NotePlusButton } from 'mobile/modules/noteTab/NotePlusButton';

type Props = {
  noteId: number,
  isWriteMode: boolean,
}

export const NoteFooter = React.memo(({ noteId, isWriteMode }: Props) => {
  const editor = useEditorContext();
  const isOperationActive = useAppSelector(selectIsOperationActive);
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);

  const showEditorControls = isAdvancedEditActive && isWriteMode;

  const showPlusButton = !isOperationActive && !showEditorControls;

  return (
    <>
    
      {showPlusButton ? <NotePlusButton noteId={noteId} /> : (
        <>
          {isOperationActive && (
            <Container maxW="3xl">
              <Operations />
            </Container>
          )}

          {showEditorControls && (
            <NoteEditorControls editor={editor} />
          )}
        </>
      )}
      <NoteDialogs noteId={noteId} />
    </>
  );
});
