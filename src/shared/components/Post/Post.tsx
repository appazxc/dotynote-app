import { Box, BoxProps, Text } from '@chakra-ui/react';

import { EditorView } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { invariant } from 'shared/util/invariant';

type Props = {
  postId?: IdentityType,
  noteId: IdentityType,
} & BoxProps;

export const Post = (props: Props) => {
  const { postId, noteId, ...restProps } = props;

  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  
  invariant(note, 'Missing note');
  
  return (
    <Box
      p="4"
      borderWidth="2px"
      borderRadius="lg"
      borderColor="slateDark.7"
      cursor="pointer"
      data-post-id={postId}
      {...restProps}
    >
      <Text fontWeight="500">{postId ? `#${postId} ` : ''}{note.title}</Text>
      <EditorView
        maxLines={4}
        removeEmptyDivsFromEnd
        content={note.content}
      />
    </Box>
  );
};
