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

const redirectToApp = [
  {
    name: routeNames.redirectNote,
    path: '/n/:noteId',
  },
];

const user = [
  {
    name: routeNames.app,
    path: '/app',
  },
  {
    name: routeNames.tabs,
    path: '/tabs',
  },
  {
    name: routeNames.search,
    path: '/search',
  },
  {
    name: routeNames.profile,
    path: '/profile',
  },
  {
    name: routeNames.account,
    path: '/account',
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
  ...redirectToApp.map((route) => ({ ...route, role: roles.user })),
];
