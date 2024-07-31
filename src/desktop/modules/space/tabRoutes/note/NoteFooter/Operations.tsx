import React from 'react';

import { selectOperation } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';

import { MoveOperation } from './MoveOperation';
import { StickOperation } from './StickOperation';

export const Operations = () => {
  const operation = useAppSelector(selectOperation);
  
  let activeOperation;

  switch(operation.type) {
  case 'stick':
    activeOperation = <StickOperation {...operation} />;
    break;
  case 'move':
    activeOperation = <MoveOperation {...operation} />;
    break;
  default:
    activeOperation = null;
  }

  return (
    activeOperation
  );
};
