import { createRoute, lazyRouteComponent, Outlet, redirect } from '@tanstack/react-router';
import React from 'react';

import { loadSpaces } from 'shared/actions/route/loadSpaces';
import { openTab } from 'shared/actions/space/openTab';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { cleanWaitedRoute } from 'shared/store/slices/appSlice';

import { LayoutLoader } from 'mobile/components/LayoutLoader';
import { balance } from 'mobile/routes/balance';
import { billing } from 'mobile/routes/billing';
import { confirmAccountDelete } from 'mobile/routes/confirmAccountDelete';
import { forbiddenUserStatus } from 'mobile/routes/forbiddenUserStatus';
import { auth } from 'mobile/routes/guards';
import { menu } from 'mobile/routes/menu';
import { primaryNote } from 'mobile/routes/primaryNote';
import { profile } from 'mobile/routes/profile';
import { Context } from 'mobile/routes/routerContext';
import { search } from 'mobile/routes/search';
import { settings } from 'mobile/routes/settings';
import { spaces } from 'mobile/routes/spaces';
import { tabs } from 'mobile/routes/tabs';

import { AppLayout } from './AppLayout';

export const appRoute = createRoute({
  getParentRoute: () => auth,
  path: 'app',
  component: React.memo(() => {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  }),
  beforeLoad: async (ctx) => {
    const context = ctx.context as unknown as Context;
    const { store } = context;
    const { dispatch } = store;

    await dispatch(loadSpaces(ctx.location.pathname));
  },
});

const appIndexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  beforeLoad: async (ctx) => {
    const context = ctx.context as unknown as Context;
    const { store } = context;
    const { dispatch, getState } = store;

    const activeSpace = selectActiveSpace(getState());
    const activeTab = selectActiveTab(getState());

    const { waitedRoute } = getState().app;

    if (!activeTab || !activeTab.routes.length) {
      return redirect({
        to: '/app/tabs',
      });
    }
    if (waitedRoute && activeSpace) {
      await dispatch(openTab({ path: waitedRoute, active: true }));
      dispatch(cleanWaitedRoute());
    }
  },
  component: lazyRouteComponent(() => import('./App')),
  pendingComponent: LayoutLoader,
});

export const app = appRoute.addChildren([
  appIndexRoute,
  spaces,
  tabs,
  primaryNote,
  search,
  menu, 
  profile,
  settings,
  billing,
  confirmAccountDelete,
  forbiddenUserStatus,
  balance,
]);