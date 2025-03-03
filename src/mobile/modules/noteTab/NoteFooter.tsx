import { Container } from '@chakra-ui/react';
import React from 'react';

import { NoteDialogs } from 'shared/components/NoteDialogs';
import { useEditorContext } from 'shared/modules/editor';
import { Operations } from 'shared/modules/noteTab/components/Operations';
import { selectIsOperationActive } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

import { NoteEditorControls } from 'mobile/modules/noteTab/NoteEditorControls';
import { NoteFooterAudioWidget } from 'mobile/modules/noteTab/NoteFooterAudioWidget';
import { NotePlusButton } from 'mobile/modules/noteTab/NotePlusButton';

type Props = {
  noteId: number;
  isWriteMode: boolean;
  isNoteContentVisible: boolean;
}

export const NoteFooter = React.memo(({ noteId, isWriteMode, isNoteContentVisible }: Props) => {
  const editor = useEditorContext();
  const isOperationActive = useAppSelector(selectIsOperationActive);
  const { isAdvancedEditActive } = useAppSelector(state => state.app.note);
  const { isMobileWidgetOpen } = useAppSelector(state => state.audio);

  const showEditorControls = isAdvancedEditActive && isWriteMode && isNoteContentVisible;
  const showPlusButton = !editor.isFocused && !isOperationActive && !showEditorControls && !isMobileWidgetOpen;

  return (
    <>
      {showPlusButton ? (
        <NotePlusButton noteId={noteId} /> 
      ) : (
        <>
          {(isOperationActive || isMobileWidgetOpen) && (
            <Container maxW="3xl" position="relative">
              {isOperationActive ? <Operations /> : <NoteFooterAudioWidget />}
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
