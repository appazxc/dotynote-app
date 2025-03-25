import { IconButton } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { PiDotsSixVerticalBold } from 'react-icons/pi';

import { useDeleteNotes } from 'shared/api/hooks/useDeleteNotes';
import { usePinnedPostsCount } from 'shared/api/hooks/usePinnedPostsCount';
import { Menu, MenuDivider, MenuItem, MenuList, MenuSub, MenuTrigger } from 'shared/components/Menu';
import { DotsIcon } from 'shared/components/ui/icons';
import { modalIds } from 'shared/constants/modalIds';
import { noteRoutePath } from 'shared/constants/noteRoutePath';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { noteSelector } from 'shared/selectors/entities';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { startStickOperation, toggleSearch } from 'shared/store/slices/appSlice';

type Props = {
  noteId: number;
  isMobile?: boolean;
  showSearch?: boolean;
};

export const NoteMenu = React.memo(({ noteId, isMobile, showSearch }: Props) => {
  const note = useAppSelector(state => noteSelector.getEntityById(state, noteId));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useDeleteNotes([noteId]);
  const { data: pinnedPostsCount } = usePinnedPostsCount(noteId);

  if (!note) {
    return null;
  }

  return (
    <>
      <Menu placement={isMobile ? 'bottom-end' : 'right-start'}>
        <MenuTrigger>
          <IconButton
            size="xs"
            aria-label="Note menu"
            variant="ghost"
          >
            {isMobile ? <DotsIcon /> : <PiDotsSixVerticalBold />}
          </IconButton>
        </MenuTrigger>
        <MenuList>
          {note.permissions.stick && (
            <MenuItem
              label="Stick"
              onClick={() => dispatch(startStickOperation({
                noteIds: [note.id],
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
          <MenuSub label="View">
            <MenuItem
              label="Note"
              onClick={() => {
                navigate({
                  to: '/app/templates/notes',
                });
              }}
            />
            <MenuItem
              label="Posts"
              onClick={() => {
                navigate({
                  to: '/app/templates/posts',
                });
              }}
            />
          </MenuSub>
          {note.permissions.update && (
            <MenuItem
              label="Settings"
              onClick={async () => {
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
                disabled={isPending}
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
