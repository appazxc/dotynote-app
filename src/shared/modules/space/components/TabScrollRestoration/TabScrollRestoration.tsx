import React from 'react';

import { useLocation, useRouterState } from '@tanstack/react-router';
import throttle from 'lodash/throttle';

import { useScrollContext } from 'shared/components/ScrollProvider';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

const scrollMap = new Map();

export const TabScrollRestoration = React.memo(() => {
  const scroll = useScrollContext();
  const { href } = useLocation();
  const tab = useTabContext();
  const { status } = useRouterState();
  const id = `href:${href}|tabId:${tab.id}`;

  React.useEffect(() => {
    const value = scrollMap.get(id) || 0;
    
    if (status !== 'idle') {
      return;
    }
    
    if (scroll?.current) {
      scroll?.current?.scrollTo(0, value);
      // setTimeout(() => scroll?.current?.scrollTo(0, value), 0);
    }

    const onScroll = throttle(() => {
      scrollMap.set(id, scroll?.current?.scrollTop);
    }, 100);

    scroll?.current?.addEventListener('scroll', onScroll);

    return () => {
      scroll?.current?.removeEventListener('scroll', onScroll);    
    };
  }, [id, scroll, status]);

  return null;
});
