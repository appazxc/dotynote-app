import keymirror from 'keymirror';

export const roles = keymirror({
  user: null,
  guest: null,
});

export type RouteRole = keyof typeof roles;
