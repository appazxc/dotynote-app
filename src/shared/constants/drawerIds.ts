import keymirror from 'keymirror';

export const drawerIds = keymirror({
  confirm: null,
  dotNoteMenu: null,
  noteContentPicker: null,
});

export type DrawerId = keyof typeof drawerIds;
