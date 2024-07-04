import React from 'react';

import { Link, LinkProps } from '@tanstack/react-router';

import { Router } from 'desktop/modules/space/tabRoutes/router';

const DesktopTabLinkComponent = (props: LinkProps<Router>, ref) => {
  return <Link ref={ref} {...props} />;
};

export const DesktopTabLink = React.memo(React.forwardRef(DesktopTabLinkComponent));