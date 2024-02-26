import { Card, Text } from '@chakra-ui/react';

import { EditorView } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const NoteItem = ({ id, onClick }) => {
  const note = useAppSelector(state => noteSelector.getById(state, id));

  invariant(note, 'Missing note');
  
  const { title, content } = note;

  return (
    <Card
      px="4"
      py="2"
      _hover={{
        boxShadow: 'outline',
      }}
      cursor="pointer"
      transitionDuration="normal"
      onClick={() => onClick(id)}
    >
      {title && (
        <Text
          fontSize="medium"
          fontWeight="500"
          display="block"
          mb="3"
        >
          {title}
        </Text>
      )}
      <EditorView
        removeEmptyDivsFromEnd
        content={content}
        maxLines={4}
      />
    </Card>
  );
};
