import * as React from 'react';

export const Loadable = (lazyFunction, { fallback = null } : { fallback?: React.ReactNode } = {}) => {
  const Component = React.lazy(lazyFunction);

  return (props) => {
    return (
      <React.Suspense fallback={fallback}>
        <Component {...props} />
      </React.Suspense>
    );
  };
};

export default Loadable;
