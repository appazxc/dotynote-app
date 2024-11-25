import { Box, BoxProps, Card, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BsFillPinAngleFill } from 'react-icons/bs';

import { Dots } from 'shared/components/Dots';
import { Checkbox } from 'shared/components/ui/checkbox';
import { EditorView } from 'shared/modules/editor';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostDotEntity } from 'shared/types/entities/PostDotEntity';

type Props = {
  noteId: number,
  isSelecting?: boolean,
  isSelected?: boolean,
  isPinned?: boolean,
  dots?: PostDotEntity[],
  showDotsAmount?: boolean,
  note: NoteEntity,
} & BoxProps;

export const Post = (props: Props) => {
  const { noteId, note, isSelecting, isSelected, isPinned, dots, showDotsAmount, ...boxProps } = props;
  
  const renderedSelectingContent = React.useMemo(() => {
    if (!isSelecting) {
      return null;
    }

    return (
      <Box p="2">
        <Checkbox size="md" checked={isSelected} />
      </Box>
    );
  }, [isSelecting, isSelected]);

  if (note._isDeleted) {
    return (
      <Card.Root>
        <Card.Body>
          Note is deleted.
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Box
      display="flex"
      position="relative"
      {...boxProps}
    >
      {renderedSelectingContent}
      <Box
        key="text"
        flexGrow="1"
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
          // overflow="hidden"
        >
          {note.title && <Text fontWeight="500">{note.title}</Text>}
          <EditorView
            removeEmptyDivsFromEnd
            maxLines={4}
            content={note.content}
          />
        </Stack>
        {dots && (
          <Dots
            placement="post"
            dots={dots}
            showAmount={showDotsAmount}
            mt="1"
          />
        )}
      </Box>
    </Box>
  );
};
