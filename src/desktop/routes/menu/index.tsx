import { createRedirectRoute } from 'shared/modules/space/tabRoutes/createRedirectRoute';

import { appRoute } from 'desktop/routes/app';

export const menu = createRedirectRoute('menu', '/app', () => appRoute);