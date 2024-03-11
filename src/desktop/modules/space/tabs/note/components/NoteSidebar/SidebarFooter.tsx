import { Box, Center, IconButton, Menu, MenuButton, MenuItem, MenuList, Spinner } from '@chakra-ui/react';
import { useIsMutating } from '@tanstack/react-query';
import { PiDotsSixVerticalBold } from 'react-icons/pi';

import { updateNoteMutationKey } from 'shared/api/hooks/useUpdateNote';
import { modalIds } from 'shared/constants/modalIds';
import { EditPostSettingsModal } from 'shared/containers/modals/EditPostSettingsModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

const NoteMenu = ({ id }: { id: string }) => {
  const note = useAppSelector(state => noteSelector.getById(state, id));
  const dispatch = useAppDispatch();

  if (!note) {
    return null;
  }

  return (
    <>
      <Menu
        placement="right-start"
      >
        <MenuButton
          as={IconButton}
          size="sm"
          variant="ghost"
          aria-label="Note menu"
          icon={<PiDotsSixVerticalBold />}
        />
        <MenuList>
          {note.postSettingsId && (
            <MenuItem
              onClick={() => {
                dispatch(showModal({ id: modalIds.editPostSettings, extraId: 'sidebarFooter' }));
              }}
            >
            Edit posts settings
            </MenuItem>
          )}
        </MenuList>
      </Menu>

      <EditPostSettingsModal noteId={id} extraId="sidebarFooter" />
    </>
  );
};

export const SidebarFooter = ({ id }) => {
  const isMutatingNotes = useIsMutating({ mutationKey: updateNoteMutationKey(id) });

  return (
    <Box
      flexDirection="column"
      gap="2"
      display="flex"
      alignItems="center"
      py="2"
    >
      {isMutatingNotes 
        ? (
          <Center h="32px" w="32px">
            <Spinner size="sm" />
          </Center>
        ) 
        : (
          <NoteMenu id={id} />
        )}
    </Box>
  );
};
