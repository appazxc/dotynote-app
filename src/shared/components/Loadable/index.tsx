import * as React from 'react';

const Loadable = (Component) => (props) => {
  return (
    <React.Suspense fallback={null}>
      <Component {...props} />
    </React.Suspense>
  );
};

export default Loadable;
