import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { useDeleteNotes } from 'shared/api/hooks/useDeleteNotes';
import { Menu, MenuDivider, MenuItem, MenuList, MenuSub, MenuTrigger } from 'shared/components/Menu';
import { MenuItemProps } from 'shared/components/Menu/MenuItem';
import { MenuSubProps } from 'shared/components/Menu/MenuSub';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { buildNoteTabRoute } from 'shared/helpers/buildNoteTabRoute';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { startSelectOperation, startStickOperation } from 'shared/store/slices/appSlice';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

type Props = {
  children: React.ReactNode;
  note: NoteEntity;
  parentId: string;
  isMenuDisabled?: boolean;
};

type MenuProps = { key: string; hasDivider?: boolean; menu?: MenuProps[] } & (MenuItemProps | MenuSubProps)

export const WithNoteMenu = React.memo((props: Props) => {
  const { note, parentId, isMenuDisabled, children } = props;
  const dispatch = useAppDispatch();
  const { id: noteId } = note;
  const navigate = useBrowserNavigate();
  const isMobile = useIsMobile();

  const { mutate: deleteNote, isPending: isDeletePending } = useDeleteNotes();
  
  const menuItems = React.useMemo(() => {
    const showSelect = true;
    const showStick = note.permissions.stick;
    const showDelete = note.permissions.delete;

    return [
      {
        key: 'Open in new tab',
        label: 'Open in new tab',
        onClick: () => {
          dispatch(openTab({ 
            path: buildNoteTabRoute(noteId, { parent: noteId }),
            active: true,
          }));

          if (isMobile) {
            navigate({ to: '/app' });
          }
        },
      },
      ...showSelect ? [{
        key: 'Select',
        label: 'Select',
        onClick: () => dispatch(startSelectOperation({
          parentId,
          noteId: noteId,
        })),
      }] : [],
      ...showStick ? [{
        key: 'Stick',
        label: 'Stick',
        onClick: () => dispatch(startStickOperation({
          fromNoteId: parentId,
          noteIds: [noteId],
        })),
      }] : [],
      ...showDelete ? [{
        key: 'Delete',
        label: 'Delete',
        disabled: isDeletePending,
        onClick: () => dispatch(showModal({ id: modalIds.confirm, extraId: `${noteId}-view-menu` })),
        hasDivider: true,
      }] : [],
    ] as MenuProps[];
  }, [
    noteId,
    dispatch,
    isMobile,
    navigate,
    isDeletePending,
    parentId,
    note,
  ]);

  const renderMenuItem = React.useCallback(({ key, menu, hasDivider, ...restProps } : MenuProps) => {
    const Component = menu ? MenuSub : MenuItem;
    const children = menu ? menu.map(renderMenuItem) : undefined;
    
    return (
      <React.Fragment key={key}>
        {hasDivider && <MenuDivider />}
        <Component {...restProps}>{children}</Component>
      </React.Fragment>
    );
  }, []);

  return (
    <>
      <Menu isContextMenu enabled={!isMenuDisabled}>
        <MenuTrigger>
          {children}
        </MenuTrigger>
        <MenuList>
          {menuItems.map(renderMenuItem)}
        </MenuList>
      </Menu>
      <ConfirmModal
        title="This action can't be undone"
        description="Delete selected note?"
        confirmText="Delete"
        extraId={`${noteId}-view-menu`}
        onConfirm={() => {
          dispatch(hideModal());
          deleteNote([noteId]);
        }}
      />
    </>
  );
});
