import { Container, Stack } from '@chakra-ui/react';

import { Posts } from 'shared/modules/space/tabRoutes/note/components/Posts';

import { NoteBase } from 'desktop/modules/space/tabRoutes/note/NoteBase';

type Props = {
  noteId: number,
}

export const NoteTabContent = ({ noteId }: Props) => {
  return (
    <Container>
      <Stack gap="5" pt="3">
        <NoteBase
          id={noteId}
          isMobile
          isWriteMode
        />
        <Posts
          key={noteId}
          noteId={noteId}
        />
      </Stack>
    </Container>
  );
};