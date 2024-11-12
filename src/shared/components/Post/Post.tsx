import { Box, BoxProps, Card, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { BsFillPinAngleFill } from 'react-icons/bs';

import { Checkbox } from 'shared/components/ui/checkbox';
import { EditorView } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
  isSelecting?: boolean,
  isSelected?: boolean,
  isPinned?: boolean,
} & BoxProps;

export const Post = (props: Props) => {
  const { noteId, isSelecting, isSelected, isPinned, ...boxProps } = props;
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  
  invariant(note, 'Missing note');

  const renderedSelectingContent = React.useMemo(() => {
    if (!isSelecting) {
      return null;
    }

    return (
      <Box p="2">
        <Checkbox size="lg" checked={isSelected} />
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
      <Box key="text" flexGrow="1">
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
          {note.title && <Text fontWeight="500">{note.title}</Text>}
          <EditorView
            removeEmptyDivsFromEnd
            maxLines={4}
            content={note.content}
          />
        </Stack>
      </Box>
    </Box>
  );
};
