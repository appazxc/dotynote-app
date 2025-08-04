import keymirror from 'keymirror';

export const entityNames = keymirror({
  user: null,
  space: null,
  spaceTab: null,
  note: null,
  post: null,
  postsSettings: null,
  noteSettings: null,
  userSettings: null,
  postNested: null,
  noteDot: null,
  postDot: null,
  noteImage: null,
  noteFile: null,
  noteAudio: null,
  noteVideo: null,
  subscriptionPlan: null,
  subscription: null,
  userBalance: null,
  noteFilters: null,
});

export type EntityName = keyof typeof entityNames;
