import keymirror from 'keymirror';

const routeNames = keymirror({
  home: null,
  app: null,
  login: null,
  search: null,
  tabs: null,
  account: null,
  spaces: null,
  profile: null,
  redirectNote: null,
});

export type RouteName = keyof typeof routeNames;

export { routeNames };
