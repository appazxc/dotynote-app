import React from 'react';

import { Box, Button, Container, IconButton, Text, VStack } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useLocation, useNavigate, useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';

import { entityApi } from 'shared/api/entityApi';
import { useSpaces } from 'shared/api/hooks/useSpaces';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { modalIds } from 'shared/constants/modalIds';
import { CreateSpaceModal } from 'shared/containers/modals/CreateSpaceModal';
import { EditSpaceModal } from 'shared/containers/modals/EditSpaceModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { spaceSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { selectActiveSpaceId, updateActiveSpaceId } from 'shared/store/slices/appSlice';
import { IdentityType } from 'shared/types/entities/BaseEntity';

import { Layout, LayoutHeader } from 'desktop/components/Layout';

const SpaceCard = ({ id, isActive }: { id: IdentityType, isActive: boolean }) => {
  const space = useAppSelector(state => spaceSelector.getById(state, id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleClick = React.useCallback(() => {
    dispatch(updateActiveSpaceId(id));
    navigate({ to: '/app' });
  }, [dispatch, id, navigate]);
  
  const { mutate: deleteSpace } = useMutation({
    mutationFn: () => {
      if (isActive) {
        dispatch(updateActiveSpaceId(null));
      }

      return entityApi.space.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: options.spaces.userList().queryKey });
    },
  });

  if (!space) {
    return null;
  }

  const extraId = `Spaces_${space.id}`;
  
  return (
    <>
      <Menu isContextMenu>
        <MenuTrigger
          as={Box}
          p="4"
          border="2px solid"
          borderColor={isActive ? 'gray:800' : 'gray.300'}
          borderRadius="md"
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
          w="full"
          minH="20"
          pt="10"
          _hover={{
            borderColor: 'gray.900',
          }}
          cursor="pointer"
          transitionDuration="slow"
          onClick={handleClick}
        >
          <Text fontSize="large" fontWeight="500">{space.name}</Text>
          <Text
            fontSize="sm"
            color="gray"
            ml="4"
            whiteSpace="nowrap"
          >
            {space.spaceTabs.length} tabs
          </Text>
        </MenuTrigger>
        <MenuList>
          <MenuItem
            onClick={() => dispatch(showModal({
              id: modalIds.editSpace,
              extraId,
            }))}
          >
            Edit
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={() => {
              deleteSpace();
            }}
            colorScheme="red"
          >Delete</MenuItem>
        </MenuList>
      </Menu>
      <EditSpaceModal id={space.id} extraId={extraId} />
    </>
  );
};

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
        p="2"
        px="4"
        left={!isLoading && (
          <Box display="flex" alignItems="center">
            <IconButton 
              aria-label="Back"
              icon={<BsArrowLeft />}
              mr="3"
              isDisabled={!canGoBack}
              variant="ghost"
              onClick={() => {
                history.back();
              }}
            />
            <Text fontSize="xl">{title}</Text>
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
