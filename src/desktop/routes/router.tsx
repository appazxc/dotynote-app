import { createRouter } from 'shared/helpers/router/route';
import { store } from 'shared/store';
import { ErrorPage } from 'desktop/routes/error';
import { NotFoundPage } from 'desktop/routes/NotFound';

import { routeDictionary } from './routeDictionary';
import { ContentLoader } from '../../shared/components/ContentLoader';

const router = createRouter({
  routeDictionary,
  store,
  pages: {
    notFoundPage: <NotFoundPage />,
    errorPage: <ErrorPage />,
    loadingPage: <ContentLoader />,
  },
});

export default router;
