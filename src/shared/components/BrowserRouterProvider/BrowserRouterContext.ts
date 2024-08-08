import React from 'react';

import { AnyRouter } from '@tanstack/react-router';

export const BrowserRouterContext = React.createContext<AnyRouter>(undefined!);
