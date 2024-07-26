import React from 'react';

import { Box, Center, IconButton, Spinner, Tooltip } from '@chakra-ui/react';
import { useIsMutating, useMutationState } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import last from 'lodash/last';
import { GoInfo } from 'react-icons/go';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { ZodIssue } from 'zod';

import { deleteNoteMutationKey, useDeleteNote } from 'shared/api/hooks/useDeleteNote';
import { updateNoteMutationKey } from 'shared/api/hooks/useUpdateNote';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { EditPostSettingsModal } from 'shared/containers/modals/EditPostSettingsModal';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { getTextFromZodError } from 'shared/util/api/getTextFromZodError';

const NoteMenu = ({ id }: { id: string }) => {
  const note = useAppSelector(state => noteSelector.getById(state, id));
  const dispatch = useAppDispatch();
  const { mutateAsync } = useDeleteNote(id);
  
  if (!note) {
    return null;
  }

  return (
    <>
      <Menu placement="right-start">
        <MenuTrigger
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
          <MenuDivider />
          <MenuItem
            onClick={() => { dispatch(showModal({ id: modalIds.confirm })); }}
            colorScheme="red"
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <EditPostSettingsModal noteId={id} extraId="sidebarFooter" />
      <ConfirmModal
        title="This action can't be undone"
        description="Delete this note?"
        confirmText="Delete"
        onConfirm={() => {
          dispatch(hideModal());
          mutateAsync();
        }}
      />
    </>
  );
};

export const SidebarFooter = ({ id }) => {
  const isUpdatingNote = useIsMutating({ mutationKey: updateNoteMutationKey(id) });
  const isDeletingNote = useIsMutating({ mutationKey: deleteNoteMutationKey(id) });

  const errors = useMutationState<ZodIssue>({
    filters: { mutationKey: updateNoteMutationKey(id) },
    select: (mutation) => {
      if (mutation.state.error instanceof AxiosError) {
        return mutation.state.error?.response?.data.errors[0];
      }

      return null;
    },
  });

  const error = last(errors);

  const errorTooltip = React.useMemo(() => {
    if (!error || !error.path[0]) {
      return null;
    }

    const text = getTextFromZodError(error);
    
    return (
      <Tooltip
        label={text}
        openDelay={300}
        placement="right"
        backgroundColor="orange"
        hasArrow
      >
        <IconButton
          aria-label="Info"
          variant="flat"
          color="orange"
          icon={<GoInfo size="18" />}
        />
      </Tooltip>
    );
  }, [error]);
  
  const content = React.useMemo(() => {
    if (isUpdatingNote || isDeletingNote) {
      return (
        <Center h="32px" w="32px">
          <Spinner size="sm" />
        </Center>
      );
    }

    if (errorTooltip) {
      return errorTooltip;
    }

    return <NoteMenu id={id} />;
  }, [id, isUpdatingNote, isDeletingNote, errorTooltip]);

  return (
    <Box
      flexDirection="column"
      gap="2"
      display="flex"
      alignItems="center"
      py="2"
    >
      {content}
    </Box>
  );
};
