import React from 'react';
import { useScrollContext } from 'shared/components/ScrollProvider';
import { useTabContext } from '../../TabProvider';
import throttle from 'lodash/throttle';

const scrollMap = new Map();

export const SpaceScrollRestoration = React.memo(() => {
  const scroll = useScrollContext();
  const tab = useTabContext();
  const lastRoute = tab.routes[tab.routes.length - 1];

  React.useLayoutEffect(() => {
    const key = tab.id + lastRoute;
    const value = scrollMap.get(key);

    if (scroll?.current && value) {
      scroll?.current.scrollTo(0, value);
    }

    const updatePosition = throttle((event) => {
      scrollMap.set(key, event.target.scrollTop);
    }, 100);

    scroll?.current?.addEventListener('scroll', updatePosition);

    return () => {
      scroll?.current?.removeEventListener('scroll', updatePosition);    
    };
  }, [tab.id, lastRoute, scroll]);

  return null;
});
