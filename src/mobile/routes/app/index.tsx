import React from 'react';

import { createRoute, lazyRouteComponent, Outlet, redirect } from '@tanstack/react-router';

import { loadSpaces } from 'shared/actions/route/loadSpaces';
import { openTab } from 'shared/actions/space/openTab';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { cleanWaitedRoute } from 'shared/store/slices/appSlice';

import { LayoutLoader } from 'mobile/components/LayoutLoader';
import { menu } from 'mobile/routes/menu';
import { profile } from 'mobile/routes/profile';
import { search } from 'mobile/routes/search';
import { settings } from 'mobile/routes/settings';
import { spaces } from 'mobile/routes/spaces';
import { tabs } from 'mobile/routes/tabs';

import { auth } from '../guards';
import { primaryNote } from '../primaryNote';
import { Context } from '../routerContext';

import { AppLayout } from './AppLayout';

export const appRoute = createRoute({
  getParentRoute: () => auth,
  path: 'app',
  beforeLoad: async (ctx) => {
    const context = ctx.context as unknown as Context;
    const { store } = context;
    const { dispatch } = store;

    await dispatch(loadSpaces(ctx.location.pathname));
  },
  component: React.memo(() => {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  }),
});

const appIndexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  loader: async (ctx) => {
    const context = ctx.context as unknown as Context;
    const { store } = context;
    const { dispatch, getState } = store;

    const activeSpace = selectActiveSpace(getState());
    const activeTab = selectActiveTab(getState());

    const { waitedRoute } = getState().app;
    
    if (!activeTab || !activeTab.routes.length) {
      throw redirect({
        to: '/app/tabs',
      });
    }

    if (waitedRoute && activeSpace) {
      await dispatch(openTab({ route: waitedRoute, active: true }));
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
]);