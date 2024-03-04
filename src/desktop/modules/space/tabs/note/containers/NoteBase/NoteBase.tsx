
import { Heading, Stack } from '@chakra-ui/react';

import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { invariant } from 'shared/util/invariant';

import { NoteEditorBase } from '../NoteEditorBase';

type Props = {
  id: IdentityType,
  isWriteMode: boolean,
}

export const NoteBase = (props: Props) => {
  const { id, isWriteMode } = props;
  const note = useAppSelector(state => noteSelector.getById(state, id));

  invariant(note, 'Missing note');

  const { title, content } = note;

  return (
    <Stack gap="4">
      {title && <Heading>{title}</Heading>}
      <NoteEditorBase
        id={id}
        isWriteMode={isWriteMode}
        content={content}
      />
    </Stack>
  );
};
