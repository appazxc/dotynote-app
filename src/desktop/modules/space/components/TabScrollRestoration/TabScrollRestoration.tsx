import React from 'react';

import { useLocation } from '@tanstack/react-router';
import throttle from 'lodash/throttle';

import { useScrollContext } from 'shared/components/ScrollProvider';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

const scrollMap = new Map();

export const TabScrollRestoration = React.memo(() => {
  const scroll = useScrollContext();
  const { state: { key = '' } } = useLocation();
  const tab = useTabContext();
  const id = key + tab.id;
  
  React.useEffect(() => {
    const value = scrollMap.get(id);
    
    if (scroll?.current && value) {
      scroll?.current.scrollTo(0, value);
    }

    const updatePosition = throttle(() => {
      scrollMap.set(id, scroll?.current?.scrollTop);
    }, 100);

    // updatePosition();

    scroll?.current?.addEventListener('scroll', updatePosition);

    return () => {
      scroll?.current?.removeEventListener('scroll', updatePosition);    
    };
  }, [id, scroll]);

  return null;
});
