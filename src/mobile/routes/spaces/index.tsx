import { createRoute } from '@tanstack/react-router';

import { appRoute } from '../app';

import { Spaces } from './Spaces';

export const spaces = createRoute({
  getParentRoute: () => appRoute,
  path: 'spaces',
  component: Spaces,
});