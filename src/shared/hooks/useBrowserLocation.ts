import React from 'react';

import { BrowserLocationContext } from '../components/BrowserProviders/BrowserLocationProvider/BrowserLocationContext';

export const useBrowserLocation = () => React.useContext(BrowserLocationContext);