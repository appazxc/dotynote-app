import React from 'react';

import { Container } from '@chakra-ui/react';

import { selectIsOperationActive } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

import { Operations } from 'desktop/modules/space/tabRoutes/note/NoteFooter/Operations';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';

type Props = {
  noteId: number,
}

export const NoteFooter = React.memo(({ noteId }: Props) => {
  const isOperationActive = useAppSelector(selectIsOperationActive);

  return (
    <>
      {isOperationActive && (
        <Container>
          <Operations />
        </Container>
      )}
      <FooterNavigation noteId={noteId} />
    </>
  );
});
