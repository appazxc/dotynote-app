import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

import { loadSpaces } from 'shared/actions/route/loadSpaces';
import { openTab } from 'shared/actions/space/openTab';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { cleanWaitedRoute } from 'shared/store/slices/appSlice';

import { billing } from 'desktop/routes/billing';
import { confirmAccountDelete } from 'desktop/routes/confirmAccountDelete';
import { forbiddenUserStatus } from 'desktop/routes/forbiddenUserStatus';
import { auth } from 'desktop/routes/guards';
import { menu } from 'desktop/routes/menu';
import { onboarding } from 'desktop/routes/onboarding';
import { primary } from 'desktop/routes/primary';
import { profile } from 'desktop/routes/profile';
import { Context } from 'desktop/routes/routerContext';
import { search } from 'desktop/routes/search';
import { settings } from 'desktop/routes/settings';
import { spaces } from 'desktop/routes/spaces';
import { tabs } from 'desktop/routes/tabs';
import { templates } from 'desktop/routes/templates';

export const appRoute = createRoute({
  getParentRoute: () => auth,
  path: 'app',
});

const appIndexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  loader: async (ctx) => {
    const context = ctx.context as Context;
    const { store } = context;
    const { dispatch, getState } = store;

    await dispatch(loadSpaces(ctx.location.pathname));

    const activeSpace = selectActiveSpace(getState());
    const { waitedRoute } = getState().app;
  
    if (waitedRoute && activeSpace) {
      await dispatch(openTab({ path: waitedRoute, active: true }));
      dispatch(cleanWaitedRoute());
    }
  },
  component: lazyRouteComponent(() => import('desktop/modules/space')),
});

export const app = appRoute.addChildren([
  appIndexRoute,
  spaces, 
  tabs, 
  primary, 
  search,
  menu,
  profile,
  settings,
  templates,
  billing,
  onboarding,
  confirmAccountDelete,
  forbiddenUserStatus,
]);