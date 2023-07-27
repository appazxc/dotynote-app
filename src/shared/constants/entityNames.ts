import keymirror from 'keymirror';

export const entityNames = keymirror({
  user: null,
  appSession: null,
  space: null,
  spaceTab: null,
  note: null,
});

export type EntityName = keyof typeof entityNames;
