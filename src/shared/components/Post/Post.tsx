import React from 'react';

import { Box, BoxProps, Card, CardBody, Radio, Text } from '@chakra-ui/react';

import { EditorView } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
  isSelecting?: boolean,
  isSelected?: boolean,
} & BoxProps;

export const Post = (props: Props) => {
  const { noteId, isSelecting, isSelected, ...boxProps } = props;

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
      <Box flexGrow="1">
        <Box
          p="4"
          borderWidth="2px"
          borderRadius="lg"
          borderColor="gray.200"
          cursor="pointer"
          userSelect="none"
        >
          <Text fontWeight="500">{note.title}</Text>
          <EditorView
            removeEmptyDivsFromEnd
            maxLines={4}
            content={note.content}
          />
        </Box>
      </Box>
    </Box>
  );
};
