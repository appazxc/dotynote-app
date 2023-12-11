import { store } from 'shared/store';
import { createRouter } from 'shared/util/router/createRouter';

import { routeDictionary } from './routeDictionary';

const Page = () => {
  return 'hello';
};

export const router = createRouter({
  routeDictionary,
  store,
  pages: {
    notFoundPage: <Page />,
    errorPage: <Page />,
  },
});
