import { Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import React from 'react';

import { useUpdateNote } from 'shared/api/hooks/useUpdateNote';
import { NoteFiles } from 'shared/components/NoteFiles';
import { NoteImages } from 'shared/components/NoteImages';
import { NoteVideos } from 'shared/components/NoteVideos';
import { Tag } from 'shared/components/ui/tag';
import { NoteAudioFiles } from 'shared/modules/noteAudio/NoteAudioFiles';
import { NoteContentDots } from 'shared/modules/noteTab/components/NoteContent/NoteContentDots';
import { noteSelector } from 'shared/selectors/entities';
import { selectNoteFullness } from 'shared/selectors/note/selectNoteFullness';
import { useAppSelector } from 'shared/store/hooks';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { invariant } from 'shared/util/invariant';

import { NoteEditorBase } from '../NoteEditorBase';

import { NoteTitle } from './NoteTitle';

type Props = {
  noteId: string;
  isWriteMode: boolean;
  isMobile?: boolean;
  parent?: NoteEntity | null;
  showParent?: boolean;
}

export const NoteContent = (props: Props) => {
  const { noteId, isWriteMode, parent, showParent, isMobile } = props;
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const { 
    isFilesUploading, 
    isContentEmpty, 
    isTextContentEmpty, 
    isNoteEmpty, 
  } = useAppSelector(state => selectNoteFullness(state, noteId));

  invariant(note, 'Missing note');

  const { mutate } = useUpdateNote(noteId);

  const { title, content } = note;

  const debouncedUpdateTitle = React.useMemo(() => {
    return debounce((title) => {
      mutate({ id: noteId, data: { title } });
    }, 2000);
  }, [mutate, noteId]);

  const showContent = isWriteMode || !isTextContentEmpty || !isNoteEmpty || isFilesUploading;

  if (!showContent) {
    return null;
  }

  return (
    <Box
      flexGrow={isWriteMode ? '1' : undefined}
      display="flex"
      flexDirection="column"
      gap="6"
      px="4"
    >
      <Box
        display="flex"
        flexGrow="1"
        flexDirection="column"
        justifyContent="stretch"
      >
        {parent?.title && showParent && (
          <Tag
            size="lg"
            display="inline-flex"
            w="fit-content"
            mb="4"
          >
            {parent?.title}
          </Tag>
        )}
        <NoteTitle
          title={title}
          isMobile={isMobile}
          isWriteMode={isWriteMode}
          onChange={debouncedUpdateTitle}
        />
        <NoteEditorBase
          key={noteId}
          noteId={noteId}
          isMobile={isMobile}
          isWriteMode={isWriteMode}
          isContentEmpty={isContentEmpty}
          content={content}
        />
      </Box>
      <NoteVideos
        noteId={noteId}
        videos={note.videos}
      />
      <NoteImages
        noteId={noteId}
        images={note.images}
        hasControls={note.permissions.update}
      />
      <NoteAudioFiles 
        noteId={noteId}
        audio={note.audio}
      />
      <NoteFiles 
        noteId={noteId}
        files={note.files}
      />
      <NoteContentDots
        dots={note.dots}
        showAmount={note.access === 'public'}
      />
    </Box>
  );
};
