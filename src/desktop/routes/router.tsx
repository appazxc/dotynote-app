import { ContentLoader } from 'shared/components/ContentLoader';
import { store } from 'shared/store';
import { createRouter } from 'shared/util/router/createRouter';

import { ErrorPage } from 'desktop/routes/error';
import { NotFoundPage } from 'desktop/routes/notFound';

import { routeDictionary } from './routeDictionary';

const router = createRouter({
  routeDictionary,
  store,
  pages: {
    notFoundPage: <NotFoundPage />,
    errorPage: <ErrorPage />,
    loadingPage: <ContentLoader text="createRouter loadingPage" />,
  },
});

export default router;
