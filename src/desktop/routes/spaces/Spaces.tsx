import { Box, Button, Container, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

import { useSpaces } from 'shared/api/hooks/useSpaces';
import { modalIds } from 'shared/constants/modalIds';
import { CreateSpaceModal } from 'shared/containers/modals/CreateSpaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { SpacesCards } from 'shared/modules/spaces/components/SpacesCards';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { Layout, LayoutHeader } from 'desktop/components/Layout';

function Spaces() {
  const dispatch = useAppDispatch();
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const { data = [], isLoading } = useSpaces();
  const { history } = useRouter();
  const title = data.length ? 'Select or create space' : 'Create space';

  const renderedHeader = React.useMemo(() => {
    return (
      <LayoutHeader
        p="2"
        px="4"
        left={!isLoading && (
          <Box display="flex" alignItems="center">
            <IconButton 
              aria-label="Back"
              size="sm"
              mr="3"
              variant="ghost"
              onClick={() => {
                history.back();
              }}
            ><BsArrowLeft /></IconButton>
            <Text fontSize="lg">{title}</Text>
          </Box>
        ) }
        right={(
          <Button
            size="sm"
            onClick={() => {
              dispatch(showModal({ id: modalIds.createSpace }));
            }}
          >
            Create space
          </Button>
        )}
      />
    );
  }, [dispatch, isLoading, history, title]);

  return (
    <Layout header={renderedHeader}>
      <Container py="10" maxW="3xl">
        <SpacesCards activeSpaceId={activeSpaceId} spaceIds={data} />
      </Container>
      <CreateSpaceModal />
    </Layout>
  );
}

export default Spaces;
