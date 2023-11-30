import { createRouter } from 'shared/util/router/createRouter';
import { store } from 'shared/store';
import { ErrorPage } from 'desktop/routes/error';
import { NotFoundPage } from 'desktop/routes/notFound';

import { routeDictionary } from './routeDictionary';
import { ContentLoader } from 'shared/components/ContentLoader';

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
