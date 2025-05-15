import { Box, Spinner, Text } from '@chakra-ui/react';
import { motion } from 'motion/react';
import React from 'react';
import { BsPlus } from 'react-icons/bs';

import { activateUserAllTypeQueriesNextPage } from 'shared/actions/activateUserAllTypeQueriesNextPage';
import { openTab } from 'shared/actions/space/openTab';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { useColorModeValue } from 'shared/components/ui/color-mode';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { useCreateNoteItems } from 'shared/hooks/useCreateNoteItems';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useBuildTabHref } from 'shared/modules/space/hooks/useBuildTabHref';
import { useAppDispatch } from 'shared/store/hooks';

export const PlusButton = React.memo(() => {
  const dispatch = useAppDispatch();
  const hoverBg = useColorModeValue('gray.100', 'brand.400');
  const buildTabHref = useBuildTabHref();

  const handleCreateNote = React.useCallback((noteId: string) => {
    dispatch(hideModal());
    dispatch(activateUserAllTypeQueriesNextPage());
    dispatch(openTab({ 
      path: buildTabHref('/n/$noteId', { noteId }),
      active: true,
    }));
  }, [dispatch, buildTabHref]);

  const handleError = React.useCallback(() => {
    dispatch(hideModal());
  }, [dispatch]);

  const { items, isLoading } = useCreateNoteItems({
    onCreate: handleCreateNote,
    extraId: 'PlusButton',
  });

  return (
    <>
      <Menu placement="bottom-end">
        <MenuTrigger>
          <Box
            asChild
            w="30px"
            h="30px"
            display="flex"
      
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            cursor="pointer"
            css={{
              transition: 'background-color 0.3s',
            }}
            _hover={{
              backgroundColor: hoverBg,
            }}
          >
            <motion.div
              whileTap={{ 
                scale: 0.9,
              }}
            >
              {isLoading ? <Spinner size="sm" /> : <BsPlus size="22px" />}
            </motion.div>
          </Box>
        </MenuTrigger>
        <MenuList>
          <Text
            color="fg.subtle"
            fontWeight="500"
            fontSize="xs"
            ml="2"
            mb="1"
          >
            Create note
          </Text>
          {items.map(({ title, icon: Icon, isDisabled, ...restProps }) => {
            return (
              <MenuItem
                key={title}
                label={<><Icon size="22" /> {title}</>}
                {...restProps}
              />
            );
          })}
        </MenuList>
      </Menu>
      <CreateNoteModal
        extraId="PlusButton"
        onCreate={handleCreateNote}
        onError={handleError}
      />
    </>
  );
});
