import { routeNames } from 'shared/constants/routeNames';

const user = [
  {
    name: routeNames.app,
    path: '/app',
  },
];

export const routeList = [
  {
    name: routeNames.home,
    path: '/',
  },
  ...user.map((route) => ({ ...route, authorize: true })),
];
