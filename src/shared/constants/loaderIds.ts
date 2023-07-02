import keymirror from 'keymirror';

export const loaderIds = keymirror({
  loginEmail: null,
  loginEmailWithCode: null,
});

export type Loader = keyof typeof loaderIds;
