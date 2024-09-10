import React from 'react';

import { IconButton } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiDotsSixVerticalBold } from 'react-icons/pi';

import { api } from 'shared/api';
import { useDeleteNote } from 'shared/api/hooks/useDeleteNote';
import { Menu, MenuDivider, MenuItem, MenuList, MenuSub, MenuTrigger } from 'shared/components/Menu';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startStickOperation, toggleSearch } from 'shared/store/slices/appSlice';

type Props = {
  noteId: number,
  isMobile?: boolean,
  showSearch?: boolean,
};

export const NoteMenu = React.memo(({ noteId, isMobile, showSearch }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutateAsync } = useDeleteNote(noteId);
  const { mutateAsync: createNoteSettings } = useMutation({
    mutationFn: () => {
      return api.post<string>(`/notes/${noteId}/settings`, {});
    },
  });

  if (!note) {
    return null;
  }

  return (
    <>
      <Menu placement={isMobile ? 'bottom-end' : 'right-start'}>
        <MenuTrigger
          as={IconButton}
          size="sm"
          variant="ghost"
          aria-label="Note menu"
          icon={isMobile ? <BsThreeDotsVertical /> : <PiDotsSixVerticalBold />}
        />
        <MenuList>
          <MenuSub label="Settings">
            <MenuItem
              label="Note"
              onClick={async () => {
                if (!note.settings) {
                  await createNoteSettings();
                }
                navigate({ to: '/n/$noteId/settings' });
              }}
            />
            {note.postsSettings && (
              <MenuItem
                label="Posts"
                onClick={() => {
                  dispatch(showModal({ id: modalIds.editPostsSettings }));
                }}
              />
            )}
          </MenuSub>
          <MenuItem
            label="Stick"
            onClick={() => dispatch(startStickOperation({
              noteIds: [note.id],
            }))}
          />
          {isMobile && showSearch && (
            <MenuItem
              label="Search"
              onClick={() => dispatch(toggleSearch())}
            />
          )}
          <MenuDivider />
          <MenuItem
            colorScheme="red"
            label="Delete"
            onClick={() => { dispatch(showModal({ id: modalIds.confirm })); }}
          />
        </MenuList>
      </Menu>
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
});
