import { sharedForbiddenUserStatus } from 'shared/routes/forbiddenUserStatus';

import { Layout } from 'mobile/components/Layout';
import { appRoute } from 'mobile/routes/app';

export const forbiddenUserStatus = sharedForbiddenUserStatus({
  getParentRoute: () => appRoute,
  Layout,
});