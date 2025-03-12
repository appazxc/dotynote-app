import { createRoute, lazyRouteComponent, redirect } from '@tanstack/react-router';
import store2 from 'store2';
import { z } from 'zod';

import { localStorageKeys } from 'shared/constants/localStorageKeys';

import { guest } from 'desktop/routes/guards';

export const idx = createRoute({
  getParentRoute: () => guest,
  path: '/',
  component: lazyRouteComponent(() => import('./Home')),
  validateSearch: z.object({
    referral: z.string().optional(),
  }),
  loaderDeps: ({ search: { referral } }) => ({ referral }),
  loader: (ctx) => {
    if (ctx.deps.referral) {
      store2.set(localStorageKeys.REFERRAL_CODE, ctx.deps.referral);
      throw redirect({
        to: '/',
        search: {
          ...ctx.location.search,
          referral: undefined,
        },
        replace: true,
      });
    }
  },
});