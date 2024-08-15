import { createRoute, redirect } from '@tanstack/react-router';

import { loadSpaces } from 'shared/actions/space/loadSpaces';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';

import { LayoutLoader } from 'mobile/components/LayoutLoader';
import { appRoute } from 'mobile/routes/app';
import { Context } from 'mobile/routes/routerContext';
import { Tabs } from 'mobile/routes/tabs/Tabs';

export const tabs = createRoute({
  getParentRoute: () => appRoute,
  path: 'tabs',
  component: Tabs,
  beforeLoad: async (ctx) => {
    const context = ctx.context as Context;
    const { store } = context;
    const { dispatch, getState } = store;
  
    await dispatch(loadSpaces());
    const activeSpace = selectActiveSpace(getState());

    if (!activeSpace) {
      throw redirect({
        to: '/app/spaces',
        // TODO: add backUrl param
      });
    }
  },
  pendingComponent: LayoutLoader,
});