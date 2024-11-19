import keymirror from 'keymirror';

export const entityTypes = keymirror({
  user: null,
  space: null,
  spaceTab: null,
  note: null,
  post: null,
  postsSettings: null,
  noteSettings: null,
  userSettings: null,
  orderBy: null,
  postInternal: null,
  noteDot: null,
  postDot: null,
});

export type EntityName = keyof typeof entityTypes;
