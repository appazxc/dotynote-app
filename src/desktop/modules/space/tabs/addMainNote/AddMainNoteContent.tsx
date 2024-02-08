import React from 'react';

import {
  Button,
  Center,
  Container,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useUpdateSpace } from 'shared/api/hooks/useUpdateSpace';
import { modalIds } from 'shared/constants/modalIds';
import { SelectNoteModal } from 'shared/containers/modals/SelectNoteModal';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceId } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

const extraId = 'AddMainNoteContent';

export const AddMainNoteContent = () => {
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
      navigate(buildTabUrl({
        routeName: tabRouteNames.note,
        pathParams: {
          noteId: value,
        },
      }));
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
          extraId={extraId}
          onSelect={handleNoteSelect}
        />
      </Container>
    </TabLayout>
  );
};

export default AddMainNoteContent;