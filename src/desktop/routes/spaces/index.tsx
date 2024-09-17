import { createRoute } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';

import { Context } from 'desktop/routes/routerContext';

import { appRoute } from '../app';

import { Spaces } from './Spaces';

export const spaces = createRoute({
  getParentRoute: () => appRoute,
  path: 'spaces',
  component: Spaces,
});
