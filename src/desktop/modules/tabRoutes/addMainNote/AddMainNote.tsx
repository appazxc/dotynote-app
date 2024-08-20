import React from 'react';

import {
  Button,
  Center,
  Container,
  Text,
} from '@chakra-ui/react';

import { selectOperation } from 'shared/selectors/operations';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startPrimaryNoteOperation } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

export const AddMainNote = React.memo(() => {
  const dispatch = useAppDispatch();
  const spaceId = useAppSelector(selectActiveSpaceId);

  invariant(spaceId, 'Missing spaceId');

  const operation = useAppSelector(selectOperation);

  const isMainNoteOperationActive = operation.type === 'mainNote';
  
  return (
    <TabLayout>
      <Container h="full">
        <Center
          display="flex"
          flexDirection="column"
          h="full"
        >
          {isMainNoteOperationActive ?
            <Text>You can now select any note as main in current space.</Text> 
            : (
              <Button
                colorScheme="brand"
                onClick={() => {
                  dispatch(startPrimaryNoteOperation());
                }}
              >
                Add main note
              </Button>
            )}
        </Center>
      </Container>
    </TabLayout>
  );
});