import React from 'react';

import { Link, LinkProps } from '@tanstack/react-router';

import { Router } from 'mobile/routes/router';

const MobileLinkComponent = (props: LinkProps<Router>, ref) => {
  return <Link ref={ref} {...props} />;
};

export const MobileLink = React.memo(React.forwardRef(MobileLinkComponent));