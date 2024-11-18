import { Container } from '@chakra-ui/react';
import React from 'react';

import { Operations } from 'shared/modules/noteTab/components/Operations';
import { selectIsOperationActive } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

export const NoteFooter = React.memo(() => {
  const isOperationActive = useAppSelector(selectIsOperationActive);

  if (!isOperationActive) {
    return null;
  }
  
  return (
    <Container maxW="3xl">
      <Operations />
    </Container>
  );
});
