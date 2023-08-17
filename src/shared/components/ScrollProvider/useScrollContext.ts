import React from 'react';

import { ScrollContext } from './ScrollContext';

export const useScrollContext = () => React.useContext(ScrollContext);