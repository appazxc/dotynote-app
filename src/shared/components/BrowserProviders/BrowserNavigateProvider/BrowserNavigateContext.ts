import { NavigateFn } from '@tanstack/react-router';
import React from 'react';

export const BrowserNavigateContext = React.createContext<NavigateFn>(undefined!);
