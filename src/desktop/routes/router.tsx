import { createRouter } from 'shared/helpers/router/route';
import { store } from 'shared/store';
import { ErrorPage } from 'desktop/routes/Error';
import { NotFoundPage } from 'desktop/routes/NotFound';

import { routeDictionary } from './routeDictionary';

const router = createRouter({
  routeDictionary,
  store,
  pages: {
    notFoundPage: <NotFoundPage />,
    errorPage: <ErrorPage />,
  },
});

export default router;
