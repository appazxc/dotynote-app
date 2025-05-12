import { Box, BoxProps, Card, Stack, Text } from '@chakra-ui/react';
import { motion } from 'motion/react';
import React from 'react';
import { BsFillPinAngleFill } from 'react-icons/bs';

import { NoteFiles } from 'shared/components/NoteFiles';
import { NoteImages } from 'shared/components/NoteImages';
import { NoteVideos } from 'shared/components/NoteVideos';
import { PostDots } from 'shared/components/Post/PostDots';
import { EditorView } from 'shared/modules/editor';
import { NoteAudioFiles } from 'shared/modules/noteAudio/NoteAudioFiles';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostDotEntity } from 'shared/types/entities/PostDotEntity';

type Props = {
  noteId: string;
  extraId?: number | string;
  isPinned?: boolean;
  dots?: PostDotEntity[];
  showDotsAmount?: boolean;
  note: NoteEntity;
} & BoxProps;

export const Post = React.forwardRef((props: Props, _) => {
  const { 
    noteId,
    extraId,
    note,
    isPinned,
    dots,
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
          borderWidth="2px"
          borderRadius="lg"
          borderColor="gray.200"
          cursor="pointer"
          userSelect="none"
          gap="2"
        >
          {note.title && <Text fontWeight="500">{ note.title}</Text>}
          <EditorView
            removeEmptyDivsFromEnd
            maxLines={4}
            content={note.content}
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
        {dots && (
          <PostDots
            dots={dots}
            showAmount={showDotsAmount}
            mt="2"
          />
        )}
      </Box>
    </Box>
  );
});
