import React from 'react';

import { createReactContext } from 'shared/util/createReactContext';

export const ScrollContext = createReactContext<React.RefObject<HTMLDivElement | null>>();
