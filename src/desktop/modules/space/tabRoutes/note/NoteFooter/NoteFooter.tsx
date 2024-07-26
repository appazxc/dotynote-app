import React from 'react';

import { Container } from '@chakra-ui/react';

import { selectIsOperationActive } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

import { Operations } from './Operations';

export const NoteFooter = React.memo(() => {
  const isOperationActive = useAppSelector(selectIsOperationActive);

  if (!isOperationActive) {
    return null;
  }
  
  return (
    <Container>
      <Operations />
    </Container>
  );
});
