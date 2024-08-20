import React from 'react';

import { Link, LinkProps, Router } from '@tanstack/react-router';

import { openTab } from 'shared/actions/space/openTab';
import { useAppDispatch } from 'shared/store/hooks';

import { buildTabHref } from 'mobile/modules/space/helpers/buildTabHref';
import { Router as RouterType } from 'mobile/modules/space/tabRoutes/router';

type Props = LinkProps<Router<RouterType['routeTree'], 'never'>> & Omit<React.AnchorHTMLAttributes<'a'>, 'children'>;

const MobileTabLinkComponent = (props: Props, ref) => {
  const dispatch = useAppDispatch();
  
  return (
    <Link 
      ref={ref} 
      {...props}
      onClick={(e) => {
        if (e.metaKey) {
          e.preventDefault();
          dispatch(openTab({ 
            route: buildTabHref({ to: props.to, params: props.params }),
          }));
        }

        props.onClick?.(e);
      }}
    />
  );
};

export const MobileTabLink = React.memo(React.forwardRef(MobileTabLinkComponent));