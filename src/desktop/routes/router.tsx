import { createRouter } from 'shared/helpers/router/route';
import { store } from 'shared/store';

import { routeDictionary } from './routeDictionary';

const router = createRouter({ routeDictionary, store });

export default router;
