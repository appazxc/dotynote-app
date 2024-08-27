import React from 'react';

import { Link, LinkProps } from '@tanstack/react-router';

import { Router } from 'mobile/routes/router';

type Props = React.HTMLAttributes<'a'> & LinkProps<Router>;

const MobileLinkComponent = (props: Props, ref) => {
  return <Link ref={ref} {...props} />;
};

export const MobileLink = React.memo(React.forwardRef(MobileLinkComponent));