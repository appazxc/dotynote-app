import * as React from 'react';

// import Loadable from 'shared/components/Loadable';
// import { Loader } from 'shared/components/Loader';

import Routes from 'mobile/routes';

// const fallback = { fallback: <Loader /> };

// const Space = Loadable(() => import('mobile/modules/space'), fallback);

export const Main = React.memo(() => {
  return (
    <>
      <Routes />
      {/* {isAppOpen && <Space />} */}
    </>
  );
});