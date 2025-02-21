import { AnyRouter } from '@tanstack/react-router';
import React from 'react';

export const BrowserRouterContext = React.createContext<AnyRouter>(undefined!);
