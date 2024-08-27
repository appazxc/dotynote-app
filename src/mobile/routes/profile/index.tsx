import { createRoute } from '@tanstack/react-router';

import { appRoute } from 'mobile/routes/app';

import { Profile } from './Profile';

export const profile = createRoute({
  getParentRoute: () => appRoute,
  path: 'profile',
  component: Profile,
});