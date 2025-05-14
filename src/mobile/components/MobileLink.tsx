import { Link, LinkProps } from '@tanstack/react-router';
import React from 'react';

import { Router } from 'mobile/routes/router';

type Props = React.HTMLAttributes<HTMLAnchorElement> & LinkProps<Router>;

const MobileLinkComponent = (props: Props, ref) => {
  return <Link ref={ref} {...props} />;
};

export const MobileLink = React.memo(React.forwardRef(MobileLinkComponent));