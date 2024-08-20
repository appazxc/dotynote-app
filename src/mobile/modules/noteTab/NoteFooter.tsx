import React from 'react';

import { Container } from '@chakra-ui/react';

import { useEditorContext } from 'shared/modules/editor';
import { Operations } from 'shared/modules/noteTab/components/Operations';
import { selectIsOperationActive } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

import { NoteEditorControls } from 'mobile/modules/noteTab/NoteEditorControls';

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
