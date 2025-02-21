import { Box, Text } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { invariant } from '@tanstack/react-router';
import React from 'react';

import { entityApi } from 'shared/api/entityApi';
import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { useColorModeValue } from 'shared/components/ui/color-mode';
import { modalIds } from 'shared/constants/modalIds';
import { EditSpaceModal } from 'shared/containers/modals/EditSpaceModal';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
import { showModal } from 'shared/modules/modal/modalSlice';
import { spaceSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { updateActiveSpaceId } from 'shared/store/slices/appSlice';

type Props = { 
  id: string; 
  isActive: boolean;
};

export const SpaceCard = React.memo(({ id, isActive }: Props) => {
  const space = useAppSelector(state => spaceSelector.getEntityById(state, id));
  const dispatch = useAppDispatch();
  const navigate = useBrowserNavigate();

  invariant(space, 'Missing space');

  const handleClick = React.useCallback(() => {
    dispatch(updateActiveSpaceId(id));
    navigate({ to: '/app' });
  }, [dispatch, id, navigate]);
  
  const { mutate: deleteSpace } = useMutation({
    mutationFn: () => {
      if (isActive) {
        dispatch(updateActiveSpaceId(null));
      }

      return entityApi.space.delete(id, { deleteFlag: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: options.spaces.userList().queryKey });
    },
  });

  const borderColor = useColorModeValue(
    isActive ? 'gray.600' : 'gray.300', 
    isActive ? 'whiteAlpha.900' : 'whiteAlpha.100');
  const hoverBorderColor = useColorModeValue(
    isActive ? 'gray.600' : 'purple.400', 
    isActive ? 'whiteAlpha.800' : 'purple.400');

  const extraId = `Spaces_${space.id}`;
  
  return (
    <>
      <Menu isContextMenu>
        <MenuTrigger>
          <Box
            p="4"
            border="2px solid"
            borderColor={borderColor}
            borderRadius="md"
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
            w="full"
            minH="20"
            pt="10"
            _hover={{
              borderColor: hoverBorderColor,
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
              {space.tabs.length} tabs
            </Text>
          </Box>
        </MenuTrigger>
        <MenuList>
          <MenuItem
            label="Edit"
            onClick={() => dispatch(showModal({
              id: modalIds.editSpace,
              extraId,
            }))}
          />
          <MenuDivider />
          <MenuItem
            colorScheme="red"
            label="Delete"
            onClick={() => {
              deleteSpace();
            }}
          />
        </MenuList>
      </Menu>
      <EditSpaceModal id={space.id} extraId={extraId} />
    </>
  );
});