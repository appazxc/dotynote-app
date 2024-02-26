import React from 'react';

import { Box, Heading, Stack } from '@chakra-ui/react';

import { EditorView } from 'shared/modules/editor';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

type Props = {
  id: string,
}

export const NoteBase = ({ id }: Props) => {
  const note = useAppSelector(state => noteSelector.getById(state, id));

  invariant(note, 'Missing note');

  const { title, content } = note;

  return (
    <Stack gap="4">
      {title && <Heading>{title}</Heading>}
      <EditorView content={content} />
    </Stack>
  );
};
