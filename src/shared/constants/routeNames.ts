import keymirror from 'keymirror';

const routeNames = keymirror({
  home: null,
  app: null,
  login: null,
});

export type RouteName = keyof typeof routeNames;

export { routeNames };
