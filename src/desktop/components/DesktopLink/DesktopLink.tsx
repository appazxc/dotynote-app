import React from 'react';

import { Link, LinkProps } from '@tanstack/react-router';

import { Router } from 'desktop/routes/router';

const DesktopLinkComponent = (props: LinkProps<Router>, ref) => {
  return <Link ref={ref} {...props} />;
};

export const DesktopLink = React.memo(React.forwardRef(DesktopLinkComponent));