import keymirror from 'keymirror';

export const appRouteNames = keymirror({
  home: null,
  note: null,
});

export type AppRouteName = keyof typeof appRouteNames;
