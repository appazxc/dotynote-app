import { Box, BoxProps, Card, CardBody, Text } from '@chakra-ui/react';

import { EditorView } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  noteId: number,
} & BoxProps;

export const NoteInPost = (props: Props) => {
  const { noteId, ...restProps } = props;

  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  
  invariant(note, 'Missing note');

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
      p="4"
      borderWidth="2px"
      borderRadius="lg"
      borderColor="gray.200"
      cursor="pointer"
      {...restProps}
    >
      <Text fontWeight="500">#{note.id} {note.title}</Text>
      <EditorView
        maxLines={4}
        removeEmptyDivsFromEnd
        content={note.content}
      />
    </Box>
  );
};
