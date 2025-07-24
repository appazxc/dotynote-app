import { useLocation, useRouterState } from '@tanstack/react-router';
import throttle from 'lodash/throttle';
import React from 'react';

import { useScrollContext } from 'shared/components/ScrollProvider';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

const scrollMap = new Map();

type Props = {
  onScrollRestoration?: () => void;
}

export const TabScrollRestoration = React.memo(({ onScrollRestoration }: Props) => {
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
    
    setTimeout(() => {
      if (scroll?.current) {
        scroll?.current?.scrollTo(0, value);
        onScrollRestoration?.();
      }
    });

    const onScroll = throttle(() => {
      scrollMap.set(id, scroll?.current?.scrollTop);
    }, 100);

    scroll?.current?.addEventListener('scroll', onScroll);

    return () => {
      scroll?.current?.removeEventListener('scroll', onScroll);    
    };
  }, [id, scroll, status, onScrollRestoration]);

  return null;
});
