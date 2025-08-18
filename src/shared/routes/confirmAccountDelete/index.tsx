import { AbsoluteCenter } from '@chakra-ui/react';
import { createRoute, redirect } from '@tanstack/react-router';
import { GoAlert } from 'react-icons/go';
import { z } from 'zod';

import { api } from 'shared/api';
import { EmptyState } from 'shared/components/ui/empty-state';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { createSharedRoute } from 'shared/routes/createSharedRoute';

export const sharedConfirmAccountDelete = createSharedRoute(({ getParentRoute }) => {
  return createRoute({
    getParentRoute,
    path: 'confirm-account-delete',
    component: () => null,
    validateSearch: z.object({
      token: z.string(),
    }),
    beforeLoad: async (ctx) => {
      await api.post('/users/delete/confirm', {
        token: ctx.search.token,
      });
  
      throw redirect({
        to: '/app/profile',
      });
    },
    errorComponent: ({ error }) => (
      <AbsoluteCenter>
        <EmptyState
          minW="300px"
          icon={<GoAlert />}
          title="Unable to confirm deletion"
          description={parseApiError(error).message}
        />
      </AbsoluteCenter>
    ),
  });
});
