import {
  createRouter,
} from '@tanstack/react-router';

import { Loader } from 'shared/components/Loader';
import { createErrorComponent } from 'shared/routes/createErrorComponent';
import { createNotFoundComponent } from 'shared/routes/createNotFoundComponent';

import { DefaultLayoutHeader } from 'desktop/components/DefaultLayoutHeader';
import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout } from 'desktop/components/Layout';
import { app } from 'desktop/routes/app';
import { auth, guest } from 'desktop/routes/guards';
import { idx } from 'desktop/routes/idx';
import { login } from 'desktop/routes/login';
import { loginEmail } from 'desktop/routes/loginEmail';
import { root } from 'desktop/routes/root';
import { context } from 'desktop/routes/routerContext';

const routeTree = root.addChildren([
  guest.addChildren([idx, login, loginEmail]),
  auth.addChildren([app]), 
]);

const DefaultErrorComponent = createErrorComponent({
  Layout: Layout,
  Link: DesktopLink,
});

const DefaultNotFoundComponent = createNotFoundComponent({
  Layout: ({ children }) => <Layout header={<DefaultLayoutHeader showBackButton />}>{children}</Layout>,
  Link: DesktopLink,
});

const createNewRouter = () => createRouter({ 
  routeTree,
  context,
  defaultPendingMinMs: 0,
  defaultPreloadStaleTime: Infinity,
  defaultErrorComponent: DefaultErrorComponent,
  defaultNotFoundComponent: DefaultNotFoundComponent,
  defaultPendingComponent: Loader,
});

let router = createNewRouter();

export const getNewRouterInstance = () => {
  return router = createNewRouter();
};

export type Router = typeof router;

export { router };
