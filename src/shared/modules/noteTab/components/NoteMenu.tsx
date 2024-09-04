import React from 'react';

import { IconButton } from '@chakra-ui/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { PiDotsSixVerticalBold } from 'react-icons/pi';

import { useDeleteNote } from 'shared/api/hooks/useDeleteNote';
import { MenuTrigger, Menu, MenuDivider, MenuItem, MenuList } from 'shared/components/Menu';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { EditPostsSettingsModal } from 'shared/containers/modals/EditPostsSettingsModal';
import { showModal, hideModal } from 'shared/modules/modal/modalSlice';
import { noteSelector } from 'shared/selectors/entities';
import { useAppSelector, useAppDispatch } from 'shared/store/hooks';
import { startStickOperation, toggleSearch } from 'shared/store/slices/appSlice';

type Props = {
  noteId: number,
  isMobile?: boolean,
  showSearch?: boolean,
};

export const NoteMenu = React.memo(({ noteId, isMobile, showSearch }: Props) => {
  const note = useAppSelector(state => noteSelector.getById(state, noteId));
  const dispatch = useAppDispatch();
  const { mutateAsync } = useDeleteNote(noteId);
  
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
          {note.postsSettingsId && (
            <MenuItem
              label="Edit posts settings"
              onClick={() => {
                dispatch(showModal({ id: modalIds.editPostsSettings }));
              }}
            />
          )}
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
      <EditPostsSettingsModal noteId={noteId} />
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
