import { createRedirectRoute } from 'shared/modules/space/tabRoutes/createRedirectRoute';

import { appRoute } from 'desktop/routes/app';

export const primary = createRedirectRoute('primary', '/app', () => appRoute);