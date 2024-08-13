import React from 'react';

import { Container } from '@chakra-ui/react';

import { selectIsOperationActive } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

import { Operations } from 'desktop/modules/tabRoutes/note/NoteFooter/Operations';

export const NoteFooter = React.memo(() => {
  const isOperationActive = useAppSelector(selectIsOperationActive);

  return (
    <>
      {isOperationActive && (
        <Container>
          <Operations />
        </Container>
      )}
    </>
  );
});
