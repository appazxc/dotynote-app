import keymirror from 'keymirror';
import { routeNames, RouteName } from 'shared/constants/routeNames';

const roles = keymirror({
  user: null,
  guest: null,
  judge: null,
});

export type RouteRole = keyof typeof roles;

export type RouteItem = {
  name: RouteName,
  path: string,
  role?: RouteRole,
}

const any = [
  {
    name: routeNames.home,
    path: '/',
  },
];

const user = [
  {
    name: routeNames.app,
    path: '/app',
  },
];

const guest = [
  {
    name: routeNames.login,
    path: '/login',
  },
];

export const routeList: RouteItem[] = [
  ...any,
  ...guest.map((route) => ({ ...route, role: roles.user })),
  ...user.map((route) => ({ ...route, role: roles.user })),
];

// homePage - Home | App
