import React from 'react';

import { BrowserRouterContext } from '../components/BrowserProviders/BrowserRouterProvider/BrowserRouterContext';

export const useBrowserRouter = () => React.useContext(BrowserRouterContext);