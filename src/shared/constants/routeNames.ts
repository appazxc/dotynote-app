import keymirror from 'keymirror';

const routeNames = keymirror({
  home: null,
  app: null,
  login: null,
});

export type RouteNames = keyof typeof routeNames;

export { routeNames };
