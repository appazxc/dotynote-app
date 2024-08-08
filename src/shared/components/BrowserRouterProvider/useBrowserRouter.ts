import React from 'react';

import { BrowserRouterContext } from './BrowserRouterContext';

export const useBrowserRouter = () => React.useContext(BrowserRouterContext);