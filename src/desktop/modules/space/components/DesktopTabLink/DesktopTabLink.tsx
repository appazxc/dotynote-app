import React from 'react';

import { Link, LinkProps } from '@tanstack/react-router';

import { Router } from 'desktop/modules/space/tabRoutes/router';

type Props = LinkProps<Router> & Omit<React.AnchorHTMLAttributes<'a'>, 'children'>;

const DesktopTabLinkComponent = (props: Props, ref) => {
  return <Link ref={ref} {...props} />;
};

export const DesktopTabLink = React.memo(React.forwardRef(DesktopTabLinkComponent));