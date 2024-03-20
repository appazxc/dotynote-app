import React from 'react';

import throttle from 'lodash/throttle';
import { useLocation, useNavigation, useNavigationType } from 'react-router';

import { useScrollContext } from 'shared/components/ScrollProvider';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

const scrollMap = new Map();

export const TabScrollRestoration = React.memo(() => {
  const scroll = useScrollContext();
  const { key } = useLocation();
  const tab = useTabContext();
  const id = key + tab.id;
  
  React.useEffect(() => {
    const value = scrollMap.get(id);
    
    if (scroll?.current && value) {
      window.sss = scroll?.current;
      console.log('scroll', id, value);
      
      scroll?.current.scrollTo(0, value);
    }

    const updatePosition = throttle(() => {
      console.log('scroll?.current?.scrollTop', scroll?.current?.scrollTop);
      
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
