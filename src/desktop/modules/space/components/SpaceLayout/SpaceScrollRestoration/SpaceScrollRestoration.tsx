import React from 'react';

import throttle from 'lodash/throttle';
import { useLocation, useNavigation, useNavigationType } from 'react-router';

import { useScrollContext } from 'shared/components/ScrollProvider';

const scrollMap = new Map();

export const SpaceScrollRestoration = React.memo(() => {
  const scroll = useScrollContext();
  const { key } = useLocation();
  const navigation = useNavigation();
  const navigationType = useNavigationType();
  console.log('navigation', navigation);
  console.log('navigationType', navigationType);

  React.useEffect(() => {
    const value = scrollMap.get(key);

    if (scroll?.current && value) {
      console.log('key', key, value);
      
      scroll?.current.scrollTo(0, value);
    }

    const updatePosition = throttle(() => {
      // console.log('scroll?.current?.scrollTop', scroll?.current?.scrollTop);
      
      scrollMap.set(key, scroll?.current?.scrollTop);
    }, 100);

    updatePosition();

    scroll?.current?.addEventListener('scroll', updatePosition);

    return () => {
      scroll?.current?.removeEventListener('scroll', updatePosition);    
    };
  }, [key, scroll]);

  return null;
});
