import React from 'react';

import { NavigateFn } from '@tanstack/react-router';

export const BrowserNavigateContext = React.createContext<NavigateFn>(undefined!);
