import React from 'react';

import { Box, Container } from '@chakra-ui/react';

import { useEditorContext } from 'shared/modules/editor';
import { selectIsOperationActive } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

import { Operations } from 'desktop/modules/tabRoutes/note/NoteFooter/Operations';

import { NoteEditorControls } from 'mobile/modules/tabRoutes/note/NoteEditorControls';

type Props = {
  isWriteMode: boolean,
}

export const NoteFooter = React.memo(({ isWriteMode }: Props) => {
  const editor = useEditorContext();
  const isOperationActive = useAppSelector(selectIsOperationActive);
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);

  const showEditorControls = isAdvancedEditActive && isWriteMode;

  return (
    <>
      {isOperationActive && (
        <Container>
          <Operations />
        </Container>
      )}

      {showEditorControls && (
        <NoteEditorControls editor={editor} />
      )}
    </>
  );
});
