import { createRouter } from 'shared/helpers/router/route';
import { store } from 'shared/store';

import { routeDictionary } from './routeDictionary';

const Page = () => {
  return 'hello';
};

const router = createRouter({
  routeDictionary,
  store,
  pages: {
    notFoundPage: <Page />,
    errorPage: <Page />,
  },
});

export default router;
