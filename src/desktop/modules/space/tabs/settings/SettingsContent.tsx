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

export const SettingsContent = () => {
  const dispatch = useAppDispatch();
  const spaceId = useAppSelector(selectActiveSpaceId);
  const navigate = useNavigate();

  invariant(spaceId, 'Missing spaceId');

  return (
    <TabLayout>
      <Container>
        hhello
      </Container>
    </TabLayout>
  );
};