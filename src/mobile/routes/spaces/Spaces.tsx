import { Button, Center, Container, IconButton } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { LiaSpaceShuttleSolid } from 'react-icons/lia';

import { useSpaces } from 'shared/api/hooks/useSpaces';
import { EmptyState } from 'shared/components/ui/empty-state';
import { Icon } from 'shared/components/ui/icon';
import { PlusIcon } from 'shared/components/ui/icons';
import { modalIds } from 'shared/constants/modalIds';
import { CreateSpaceModal } from 'shared/containers/modals/CreateSpaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { SpacesCards } from 'shared/modules/spaces/components/SpacesCards';
import { selectActiveSpaceId } from 'shared/selectors/space/selectActiveSpaceId';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';

const Spaces = React.memo(() => {
  const dispatch = useAppDispatch();
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const { data = [] } = useSpaces();
  const { history } = useRouter();

  const renderedHeader = React.useMemo(() => {
    return (
      <LayoutHeader
        pr="4"
        title="Spaces"
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
          <IconButton
            size="sm"
            variant="ghost"
            iconSize="auto"
            onClick={() => {
              dispatch(showModal({ id: modalIds.createSpace }));
            }}
          >
            <PlusIcon size="22" />
          </IconButton>
        )}
      />
    );
  }, [dispatch, history]);

  return (
    <Layout header={renderedHeader}>
      {data.length === 0 ? 
        (
          <Center h="full">
            <EmptyState
              icon={<Icon transform="rotate(-20deg)"><LiaSpaceShuttleSolid /></Icon>}
              title="You have no spaces yet"
            >
              <Button
                size="2xs"
                variant="subtle"
                onClick={() => {
                  dispatch(showModal({ id: modalIds.createSpace }));
                }}
              >
                Create space
              </Button>
            </EmptyState>
          </Center>
        ) : (
          <Container py="10">
            <SpacesCards activeSpaceId={activeSpaceId} spaceIds={data} />
          </Container>
        )}
      <CreateSpaceModal />
    </Layout>
  );
});

export { Spaces };

export default Spaces;
