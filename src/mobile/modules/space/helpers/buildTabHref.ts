import { Router, ToOptions } from '@tanstack/react-router';

import { Router as RouterType, router } from 'mobile/modules/tabRoutes/router';

type Params = ToOptions<Router<RouterType['routeTree'], 'never'>>;

export const buildTabHref = (params: Params) => router.buildLocation(params).href;