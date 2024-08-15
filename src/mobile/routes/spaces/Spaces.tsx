import React from 'react';

import { Box, Button, Container, IconButton, Text } from '@chakra-ui/react';
import { useLocation, useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';

import { useSpaces } from 'shared/api/hooks/useSpaces';
import { modalIds } from 'shared/constants/modalIds';
import { CreateSpaceModal } from 'shared/containers/modals/CreateSpaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { SpacesCards } from 'shared/modules/spaces/components/SpacesCards';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

function Spaces() {
  const dispatch = useAppDispatch();
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const { data = [], isLoading } = useSpaces();
  const location = useLocation();
  const { history } = useRouter();
  const canGoBack = location.state.key !== 'default' && !!data.length && !!activeSpaceId;
  const title = data.length ? 'Select or create space' : 'Create space';

  const renderedHeader = React.useMemo(() => {
    return (
      <LayoutHeader
        pr="4"
        left={!isLoading && (
          <Box display="flex" alignItems="center">
            <IconButton 
              size="sm"
              aria-label="Back"
              icon={<BsArrowLeft />}
              mr="3"
              isDisabled={!canGoBack}
              variant="ghost"
              onClick={() => {
                history.back();
              }}
            />
            <Text fontSize="md">{title}</Text>
          </Box>
        ) }
        right={(
          <Button
            size="sm"
            colorScheme="brand"
            onClick={() => {
              dispatch(showModal({ id: modalIds.createSpace }));
            }}
          >
            Create space
          </Button>
        )}
      />
    );
  }, [dispatch, canGoBack, isLoading, history, title]);

  return (
    <Layout header={renderedHeader}>
      <Container py="10">
        <SpacesCards activeSpaceId={activeSpaceId} spaceIds={data} />
      </Container>
      <CreateSpaceModal />
    </Layout>
  );
}

export { Spaces };
