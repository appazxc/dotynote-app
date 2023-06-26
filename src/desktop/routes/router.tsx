import { createRouter } from 'shared/helpers/route';
import { store } from 'shared/state/store';

import { routeDictionary } from './routeDictionary';

const router = createRouter({ routeDictionary, store });

export default router;
