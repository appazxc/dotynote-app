import keymirror from 'keymirror';

export const entityNames = keymirror({
  user: null,
  space: null,
  spaceTab: null,
  note: null,
  post: null,
});

export type EntityName = keyof typeof entityNames;
