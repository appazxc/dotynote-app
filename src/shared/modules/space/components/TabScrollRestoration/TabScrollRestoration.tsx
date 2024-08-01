import React from 'react';

import { useLocation, useRouter } from '@tanstack/react-router';
import throttle from 'lodash/throttle';

import { useScrollContext } from 'shared/components/ScrollProvider';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

const scrollMap = new Map();

export const TabScrollRestoration = React.memo(() => {
  const scroll = useScrollContext();
  const { href } = useLocation();
  const tab = useTabContext();
  const id = href + tab.id;

  React.useEffect(() => {
    const value = scrollMap.get(id);

    if (scroll?.current && value) {
      setTimeout(() => scroll?.current?.scrollTo(0, value), 0);
    }

    const onScroll = throttle(() => {
      scrollMap.set(id, scroll?.current?.scrollTop);
    }, 100);

    scroll?.current?.addEventListener('scroll', onScroll);

    return () => {
      scroll?.current?.removeEventListener('scroll', onScroll);    
    };
  }, [id, scroll]);

  return null;
});
