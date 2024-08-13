import React from 'react';

import { BrowserLocationContext } from './BrowserLocationContext';

export const useBrowserLocation = () => React.useContext(BrowserLocationContext);