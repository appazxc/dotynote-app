import { SetupWorker, setupWorker } from 'msw';

import { handlers } from './handlers';

const worker: SetupWorker = setupWorker(...handlers);

export default worker;
