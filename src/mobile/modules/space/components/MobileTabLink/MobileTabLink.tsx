import { Link, LinkProps, Router } from '@tanstack/react-router';
import React from 'react';

import { openTab } from 'shared/actions/space/openTab';
import { useBuildTabHref } from 'shared/modules/space/hooks/useBuildTabHref';
import { useAppDispatch } from 'shared/store/hooks';

import { Router as RouterType } from 'mobile/modules/space/tabRoutes/router';

type Props = LinkProps<Router<RouterType['routeTree'], 'never', boolean>> 
  & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>;

const MobileTabLinkComponent = (props: Props, ref) => {
  const dispatch = useAppDispatch();
  const buildTabHref = useBuildTabHref();

  return (
    <Link 
      ref={ref} 
      {...props}
      onClick={(e) => {
        if (e.metaKey) {
          e.preventDefault();
          dispatch(openTab({ 
            path: buildTabHref(props.to, props.params),
          }));
        }

        props.onClick?.(e);
      }}
    />
  );
};

export const MobileTabLink = React.memo(React.forwardRef(MobileTabLinkComponent));