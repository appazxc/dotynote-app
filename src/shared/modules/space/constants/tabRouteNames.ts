import keymirror from 'keymirror';

export const tabRouteNames = keymirror({
  home: null,
  note: null,
  addMainNote: null,
  createNote: null,
});

export type TabName = keyof typeof tabRouteNames;
