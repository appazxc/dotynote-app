import keymirror from 'keymirror';

export const appRouteNames = keymirror({
  home: null,
  note: null,
  blank: null,
});

export type AppRouteName = keyof typeof appRouteNames;
