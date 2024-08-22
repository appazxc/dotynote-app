import { createRedirectRoute } from 'shared/modules/space/tabRoutes/createRedirectRoute';

import { appRoute } from 'desktop/routes/app';

export const search = createRedirectRoute('search', '/app', () => appRoute);