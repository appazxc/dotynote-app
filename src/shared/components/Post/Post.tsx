import { Box, BoxProps, Card, Stack, Text } from '@chakra-ui/react';
import { motion } from 'motion/react';
import React from 'react';
import { BsFillPinAngleFill } from 'react-icons/bs';

import { NoteFiles } from 'shared/components/NoteFiles';
import { NoteImages } from 'shared/components/NoteImages';
import { NoteVideos } from 'shared/components/NoteVideos';
import { EditorView } from 'shared/modules/editor';
import { NoteAudioFiles } from 'shared/modules/noteAudio/NoteAudioFiles';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  noteId: string;
  extraId?: number | string;
  isPinned?: boolean;
  showDotsAmount?: boolean;
  note: NoteEntity;
} & BoxProps;

export const Post = React.forwardRef((props: Props, _) => {
  const { 
    noteId,
    extraId,
    note,
    isPinned,
    onClick,
    showDotsAmount,
    ...boxProps 
  } = props;

  if (note._isDeleted) {
    return (
      <Card.Root asChild>
        <motion.div layout>
          <Card.Body>
            Note is deleted.
          </Card.Body>
        </motion.div>
      </Card.Root>
    );
  }

  return (
    <Box
      display="flex"
      position="relative"
      onClick={onClick}
      {...boxProps}
    >
      <Box
        key="text"
        flexGrow="1"
        w="full"
      >
        {isPinned && (
          <Box
            p="2"
            color="blue.500"
            display="flex"
            justifyContent="flex-end"
            position="absolute"
            top="0px"
            right="0px"
          >
            <BsFillPinAngleFill size="16" />
          </Box>
        )}
        <Stack
          p="4"
          borderRadius="2xl"
          cursor="pointer"
          userSelect="none"
          boxShadow="0 2px 8px -2px rgb(from #14181f r g b / 7.5%), 0 0 0 1px rgb(from #14181f r g b / calc(3% + 1%))"
          gap="2"
        >
          {note.title && <Text fontWeight="500" fontSize="md">{ note.title}</Text>}
          <EditorView
            removeEmptyDivsFromEnd
            maxLines={4}
            content={note.content}
            color="#14181fc4"
          />
          <NoteVideos
            noteId={noteId}
            extraId={extraId}
            videos={note.videos}
          />
          <NoteImages
            inPost
            noteId={noteId}
            images={note.images}
            hasControls={true}
          />
          <NoteFiles
            size="sm"
            noteId={noteId}
            files={note.files}
          />
          <NoteAudioFiles
            noteId={noteId}
            audio={note.audio}
          />
        </Stack>
      </Box>
    </Box>
  );
});
