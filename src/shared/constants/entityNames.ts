import keymirror from 'keymirror';

export const entityNames = keymirror({
  user: null,
  appSession: null,
});

export type EntityName = keyof typeof entityNames;
