import React from 'react';

import { MoveOperation } from 'shared/modules/noteTab/components/Operations/MoveOperation';
import { PrimaryNoteOperation } from 'shared/modules/noteTab/components/Operations/PrimaryNoteOperation';
import { StickOperation } from 'shared/modules/noteTab/components/Operations/StickOperation';
import { selectOperation } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

export const Operations = React.memo(() => {
  const operation = useAppSelector(selectOperation);
  
  let activeOperation;

  switch(operation.type) {
  case 'stick':
    activeOperation = <StickOperation {...operation} />;
    break;
  case 'move':
    activeOperation = <MoveOperation {...operation} />;
    break;
  case 'primaryNote':
    activeOperation = <PrimaryNoteOperation {...operation} />;
    break;
  default:
    activeOperation = null;
  }

  return (
    activeOperation
  );
});
