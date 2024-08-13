import React from 'react';

import { ParsedLocation } from '@tanstack/react-router';

export const BrowserLocationContext = React.createContext<ParsedLocation<any>>(undefined!);
