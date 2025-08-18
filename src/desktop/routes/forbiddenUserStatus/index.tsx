import { sharedForbiddenUserStatus } from 'shared/routes/forbiddenUserStatus';

import { Layout } from 'desktop/components/Layout';
import { appRoute } from 'desktop/routes/app';

export const forbiddenUserStatus = sharedForbiddenUserStatus({
  getParentRoute: () => appRoute,
  Layout,
});