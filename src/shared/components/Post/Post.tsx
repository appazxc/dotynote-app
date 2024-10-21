import React from 'react';

import { Box, BoxProps, Card, CardBody, Radio, Stack, Text } from '@chakra-ui/react';
import { BsFillPinAngleFill } from 'react-icons/bs';

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
        <Radio size="lg" isChecked={isSelected} />
      </Box>
    );
  }, [isSelecting, isSelected]);

  if (note._isDeleted) {
    return (
      <Card>
        <CardBody>
          Note is deleted.
        </CardBody>
      </Card>
    );
  }

  return (
    <Box
      display="flex"
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
