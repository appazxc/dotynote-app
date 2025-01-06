import { Button, Container, IconButton } from '@chakra-ui/react';
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

import { Layout, LayoutHeader } from 'mobile/components/Layout';

const Spaces = React.memo(() => {
  const dispatch = useAppDispatch();
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const { data = [] } = useSpaces();
  const { history } = useRouter();
  const title = data.length ? 'Select or create space' : 'Create space';

  const renderedHeader = React.useMemo(() => {
    return (
      <LayoutHeader
        pr="4"
        title={title}
        left={(
          <IconButton 
            size="sm"
            aria-label="Back"
            variant="plain"
            iconSize="auto"
            onClick={() => {
              history.back();
            }}
          >
            <BsArrowLeft size="20" />
          </IconButton>
        )}
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
  }, [dispatch, history, title]);

  return (
    <Layout header={renderedHeader}>
      <Container py="10">
        <SpacesCards activeSpaceId={activeSpaceId} spaceIds={data} />
      </Container>
      <CreateSpaceModal />
    </Layout>
  );
});

export { Spaces };

export default Spaces;
