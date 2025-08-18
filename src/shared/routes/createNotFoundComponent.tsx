import { NotFoundRouteProps } from '@tanstack/react-router';
import React from 'react';

import { DefaultNotFoundComponent } from 'shared/routes/DefaultNotFoundComponent';

type CreateErrorComponentProps = {
  Layout?: React.ComponentType<{ children: React.ReactNode }>,
  Link: React.ComponentType<{ to: string, children: React.ReactNode }>,
  NotFoundComponent?: React.ComponentType<{ 
    Layout: React.ComponentType<{ children: React.ReactNode }>,
    Link: React.ComponentType<{ to: string, children: React.ReactNode }>,
  }>,
}

export const createNotFoundComponent = (props: CreateErrorComponentProps) => {
  return (_props: NotFoundRouteProps) => {
    const {
      Layout = React.Fragment,
      Link,
      NotFoundComponent = DefaultNotFoundComponent,
    } = props;

    return (
      <NotFoundComponent
        Layout={Layout}
        Link={Link}
      />
    );
  };
};