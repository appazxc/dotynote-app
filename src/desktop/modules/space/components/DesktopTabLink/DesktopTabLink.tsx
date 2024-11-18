import { Link, LinkProps, Router } from '@tanstack/react-router';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { useAppDispatch } from 'shared/store/hooks';

import { buildTabHref } from 'desktop/modules/space/helpers/buildTabHref';
import { Router as RouterType } from 'desktop/modules/space/tabRoutes/router';

type Props = LinkProps<Router<RouterType['routeTree'], 'never'>> & Omit<React.AnchorHTMLAttributes<'a'>, 'children'>;

const DesktopTabLinkComponent = (props: Props, ref) => {
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

export const DesktopTabLink = React.memo(React.forwardRef(DesktopTabLinkComponent));