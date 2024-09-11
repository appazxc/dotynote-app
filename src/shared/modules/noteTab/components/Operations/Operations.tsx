import React from 'react';

import { HubOperation } from 'shared/modules/noteTab/components/Operations/HubOperation';
import { MoveOperation } from 'shared/modules/noteTab/components/Operations/MoveOperation';
import { PrimaryNoteOperation } from 'shared/modules/noteTab/components/Operations/PrimaryNoteOperation';
import { StickOperation } from 'shared/modules/noteTab/components/Operations/StickOperation';
import { selectOperation } from 'shared/selectors/operations';
import { useAppSelector } from 'shared/store/hooks';
import { operationTypes } from 'shared/store/slices/appSlice';

export const Operations = React.memo(() => {
  const operation = useAppSelector(selectOperation);
  
  let activeOperation;

  switch(operation.type) {
  case operationTypes.STICK:
    activeOperation = <StickOperation {...operation} />;
    break;
  case operationTypes.MOVE:
    activeOperation = <MoveOperation {...operation} />;
    break;
  case operationTypes.PRIMARY_NOTE:
    activeOperation = <PrimaryNoteOperation {...operation} />;
    break;
  case operationTypes.HUB:
    activeOperation = <HubOperation {...operation} />;
    break;
  default:
    activeOperation = null;
  }

  return (
    activeOperation
  );
});
