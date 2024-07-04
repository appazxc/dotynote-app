import React from 'react';

import {
  Button,
  Center,
  Container,
} from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';

import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { modalIds } from 'shared/constants/modalIds';
import { SelectNoteModal } from 'shared/containers/modals/SelectNoteModal';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceId } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

const extraId = 'AddMainNoteContent';

export const AddMainNote = React.memo(() => {
  const dispatch = useAppDispatch();
  const spaceId = useAppSelector(selectActiveSpaceId);
  const navigate = useNavigate();

  invariant(spaceId, 'Missing spaceId');

  const { mutate, isPending } = useUpdateSpace(spaceId);
  
  const handleNoteSelect = React.useCallback((value) => {
    if (isPending) {
      return;
    }

    dispatch(hideModal());
    mutate({ mainNoteId: value }, { onSuccess: () => {
      navigate({
        to: '/n/$noteId',
        params: { noteId: value },
      });
    } });
  }, [mutate, isPending, dispatch, navigate]);

  return (
    <TabLayout>
      <Container h="full">
        <Center
          display="flex"
          flexDirection="column"
          h="full"
        >
          <Button
            colorScheme="brand"
            variant="outline"
            isLoading={isPending}
            onClick={() => {
              dispatch(showModal({ id: modalIds.selectNote, extraId }));
            }}
          >
            Add main note
          </Button>
        </Center>
        <SelectNoteModal
          title="Select main note"
          extraId={extraId}
          onSelect={handleNoteSelect}
        />
      </Container>
    </TabLayout>
  );
});