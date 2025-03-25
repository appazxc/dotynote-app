import { Button, Container } from '@chakra-ui/react';
import React from 'react';

import { useSpaces } from 'shared/api/hooks/useSpaces';
import { modalIds } from 'shared/constants/modalIds';
import { CreateSpaceModal } from 'shared/containers/modals/CreateSpaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { SpacesCards } from 'shared/modules/spaces/components/SpacesCards';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { DefaultLayoutHeader } from 'desktop/components/DefaultLayoutHeader';
import { Layout } from 'desktop/components/Layout';

function Spaces() {
  const dispatch = useAppDispatch();
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const { data = [] } = useSpaces();

  const renderedHeader = React.useMemo(() => {
    return (
      <DefaultLayoutHeader
        showBackButton
        title="Spaces"
        right={(
          <Button
            size="sm"
            variant="subtle"
            onClick={() => {
              dispatch(showModal({ id: modalIds.createSpace }));
            }}
          >
            Create space
          </Button>
        )}
      />
    );
  }, [dispatch]);

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
