import React from 'react';

import { Button, Container, Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useSpaces } from 'shared/api/hooks/useSpaces';
import { Logo } from 'shared/components/Logo';
import { modalIds } from 'shared/constants/modalIds';
import { CreateSpaceModal } from 'shared/containers/modals/CreateSpaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { spaceSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceId } from 'shared/store/slices/appSlice';

import { Layout, LayoutHeader } from 'desktop/components/Layout';

const SpaceCard = ({ id, isActive }: { id: string, isActive: boolean }) => {
  const space = useAppSelector(state => spaceSelector.getById(state, id));

  if (!space) {
    return null;
  }

  return (
    <Box
      p="4"
      border="2x solid"
      borderColor="gray.500"
    >
      {JSON.stringify(space, null, 2)}
    </Box>
  );
};

function Spaces() {
  const dispatch = useAppDispatch();
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const { data = [] } = useSpaces();
  
  const renderedHeader = React.useMemo(() => {
    return (
      <LayoutHeader
        p="2"
        px="4"
        left={<Text fontSize="x-large">Select or create space</Text>}
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
  }, [dispatch]);

  return (
    <Layout header={renderedHeader}>
      <Container>
        {data.map((spaceId) => {
          return (
            <SpaceCard
              key={spaceId}
              id={spaceId}
              isActive={activeSpaceId === spaceId}
            />
          );
        })}
      </Container>
      <CreateSpaceModal />
    </Layout>
  );
}

export { Spaces };
