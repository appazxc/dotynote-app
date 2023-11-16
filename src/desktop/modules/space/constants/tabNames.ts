import keymirror from 'keymirror';

export const tabNames = keymirror({
  home: null,
  note: null,
});

export type TabName = keyof typeof tabNames;
