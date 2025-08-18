import {
  createRouter,
} from '@tanstack/react-router';

import { Loader } from 'shared/components/Loader';
import { createErrorComponent } from 'shared/routes/createErrorComponent';
import { createNotFoundComponent } from 'shared/routes/createNotFoundComponent';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';
import { MobileLink } from 'mobile/components/MobileLink';
import { app } from 'mobile/routes/app';
import { auth, guest } from 'mobile/routes/guards';
import { idx } from 'mobile/routes/idx';
import { login } from 'mobile/routes/login';
import { loginEmail } from 'mobile/routes/loginEmail';
import { onboarding } from 'mobile/routes/onboarding';
import { root } from 'mobile/routes/root';
import { context } from 'mobile/routes/routerContext';

const routeTree = root.addChildren([
  auth.addChildren([onboarding, app]), 
  guest.addChildren([idx, login, loginEmail]),
]);

const DefaultErrorComponent = createErrorComponent({
  Layout: Layout,
  Link: MobileLink,
});

const DefaultNotFoundComponent = createNotFoundComponent({
  Layout: ({ children }) => <Layout header={<LayoutHeader showBackButton />}>{children}</Layout>,
  Link: MobileLink,
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
