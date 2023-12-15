import * as React from 'react';

type Options = { 
  fallback?: React.ReactNode, 
};

export const Loadable = (lazyFunction, { fallback = null } : Options = {}) => {
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
