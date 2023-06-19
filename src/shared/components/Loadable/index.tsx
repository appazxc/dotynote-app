import * as React from 'react';

const Loadable = (lazyFunction) => {
  const Component = React.lazy(lazyFunction);

  return (props) => {
    return (
      <React.Suspense fallback={null}>
        <Component {...props} />
      </React.Suspense>
    );
  };
};

export default Loadable;
