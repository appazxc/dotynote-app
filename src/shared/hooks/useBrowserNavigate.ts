import React from 'react';

import { BrowserNavigateContext } from '../components/BrowserProviders/BrowserNavigateProvider/BrowserNavigateContext';

export const useBrowserNavigate = () => React.useContext(BrowserNavigateContext);