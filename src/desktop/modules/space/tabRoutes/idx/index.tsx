import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { root } from '../root';

const Home = lazyRouteComponent(() => import('./Home'));

export const idx = createRoute({
  getParentRoute: () => root,
  path: '/',
  component: () => <Home />,
});