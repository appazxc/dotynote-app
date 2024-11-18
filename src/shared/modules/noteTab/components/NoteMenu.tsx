import { IconButton } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiDotsSixVerticalBold } from 'react-icons/pi';

import { api } from 'shared/api';
import { useDeleteNotes } from 'shared/api/hooks/useDeleteNotes';
import { usePinnedPostsCount } from 'shared/api/hooks/usePinnedPostsCount';
import { Menu, MenuDivider, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { modalIds } from 'shared/constants/modalIds';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
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
  const { mutateAsync } = useDeleteNotes(noteId);
  const { data: pinnedPostsCount } = usePinnedPostsCount(noteId);

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
          size="xs"
          aria-label="Note menu"
          variant="ghost"
        >{isMobile ? <BsThreeDotsVertical /> : <PiDotsSixVerticalBold />}</MenuTrigger>
        <MenuList>
          {note.permissions.stick && (
            <MenuItem
              label="Stick to"
              onClick={() => dispatch(startStickOperation({
                noteId: note.id,
              }))}
            />
          )}
          {isMobile && showSearch && (
            <MenuItem
              label="Search"
              onClick={() => dispatch(toggleSearch())}
            />
          )}
          {isMobile && !!pinnedPostsCount && (
            <MenuItem
              label="Pinned posts"
              onClick={() => navigate({ to: `${noteRoutePath}/pinned`, params: { noteId } })}
            />
          )}
          {note.permissions.update && (
            <MenuItem
              label="Settings"
              onClick={async () => {
                if (!note.settings) {
                  await createNoteSettings();
                }
                navigate({ to: `${noteRoutePath}/settings` });
              }}
            />
          )}
          {note.permissions.delete && (
            <>
              <MenuDivider />
              <MenuItem
                colorScheme="red"
                label="Delete"
                onClick={() => { dispatch(showModal({ id: modalIds.confirm })); }}
              />
            </>
          )}
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
