import { routeNames, RouteName } from 'shared/constants/routeNames';

import { RouteRole, roles } from './roles';

export type RouteListItem = {
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

export const routeList: RouteListItem[] = [
  ...any,
  ...guest.map((route) => ({ ...route, role: roles.guest })),
  ...user.map((route) => ({ ...route, role: roles.user })),
];
