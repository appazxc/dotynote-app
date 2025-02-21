import { ParsedLocation } from '@tanstack/react-router';
import React from 'react';

export const BrowserLocationContext = React.createContext<ParsedLocation<any>>(undefined!);
