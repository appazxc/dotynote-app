import keymirror from 'keymirror';

export const loaderIds = keymirror({
  loginEmail: null,
  loginEmailWithCode: null,
  createTab: null,
});

export type Loader = keyof typeof loaderIds;
