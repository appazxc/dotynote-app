import { createRouter } from 'shared/helpers/route';
import { store } from 'shared/store';

import { routeDictionary } from './routeDictionary';

const router = createRouter({ routeDictionary, store });

export default router;
