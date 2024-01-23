import React from 'react';

import { Box, Button, Container, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useSpaces } from 'shared/api/hooks/useSpaces';
import { modalIds } from 'shared/constants/modalIds';
import { routeNames } from 'shared/constants/routeNames';
import { CreateSpaceModal } from 'shared/containers/modals/CreateSpaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { spaceSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceId, updateActiveSpaceId } from 'shared/store/slices/appSlice';
import { buildUrl } from 'shared/util/router/buildUrl';

import { Layout, LayoutHeader } from 'desktop/components/Layout';

const SpaceCard = ({ id, isActive }: { id: string, isActive: boolean }) => {
  const space = useAppSelector(state => spaceSelector.getById(state, id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = React.useCallback(() => {
    dispatch(updateActiveSpaceId(id));
    navigate(buildUrl({ routeName: routeNames.app }));
  }, [dispatch, id, navigate]);
  
  if (!space) {
    return null;
  }

  return (
    <Box
      p="4"
      border="2px solid"
      borderColor={isActive ? 'gray:800' : "gray.300"}
      borderRadius="md"
      display="flex"
      alignItems="flex-end"
      w="full"
      minH="20"
      _hover={{
        borderColor: 'gray.900',
      }}
      cursor="pointer"
      transitionDuration="slow"
      onClick={handleClick}
    >
      <Text fontSize="large" fontWeight="500">{space.name}</Text>
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
      <Container pt="10">
        <VStack gap="2">
          {data.map((spaceId) => {
            return (
              <SpaceCard
                key={spaceId}
                id={spaceId}
                isActive={activeSpaceId === spaceId}
              />
            );
          })}
        </VStack>
      </Container>
      <CreateSpaceModal />
    </Layout>
  );
}

export { Spaces };
