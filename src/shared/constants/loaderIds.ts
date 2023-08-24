import keymirror from 'keymirror';

export const loaderIds = keymirror({
  loginEmail: null,
  loginEmailWithCode: null,
  createSpaceTab: null,
});

export type Loader = keyof typeof loaderIds;
