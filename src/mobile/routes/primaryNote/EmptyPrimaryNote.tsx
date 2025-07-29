import { Button, Center } from '@chakra-ui/react';
import React from 'react';
import { BsLayoutTextSidebar } from 'react-icons/bs';

import { EmptyState } from 'shared/components/ui/empty-state';
import { Icon } from 'shared/components/ui/icon';
import { SearchIcon } from 'shared/components/ui/icons';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, startPrimaryNoteOperation } from 'shared/store/slices/appSlice';

type Props = {};

export const EmptyPrimaryNote = React.memo((_props: Props) => {
  const dispatch = useAppDispatch();
  const operation = useAppSelector(selectOperation);
  const isPrimaryNoteOperation = operation.type === operationTypes.PRIMARY_NOTE;

  if (isPrimaryNoteOperation) {
    return (
      <Center h="full">
        <EmptyState
          icon={(
            <Icon animation="bounce">
              <SearchIcon />
            </Icon>
          )}
          description="Search for a note and set it as space primary."
        />  
      </Center>
    );
  }

  return (
    <Center h="full">
      <EmptyState
        icon={<BsLayoutTextSidebar />}
        title="This space has no primary note"
      >
        <Button
          size="2xs"
          variant="subtle"
          onClick={() => {
            dispatch(startPrimaryNoteOperation());
          }}
        >
          Assign note
        </Button>
      </EmptyState>
    </Center>
  );
});
