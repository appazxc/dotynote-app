import keymirror from 'keymirror';

const routeNames = keymirror({
  home: null,
  app: null,
  login: null,
  search: null,
  profile: null,
  tabs: null,
  account: null,
});

export type RouteName = keyof typeof routeNames;

export { routeNames };
