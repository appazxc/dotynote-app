import { sharedConfirmAccountDelete } from 'shared/routes/confirmAccountDelete';

import { appRoute } from '../app';

export const confirmAccountDelete = sharedConfirmAccountDelete({
  getParentRoute: () => appRoute,
});