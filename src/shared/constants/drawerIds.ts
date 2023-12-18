import keymirror from 'keymirror';

export const drawerIds = keymirror({
  confirm: null,
});

export type DrawerId = keyof typeof drawerIds;
