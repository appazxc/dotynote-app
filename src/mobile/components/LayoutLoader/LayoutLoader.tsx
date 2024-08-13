import React from 'react';

import { Loader } from 'shared/components/Loader';

import { Layout } from 'mobile/components/Layout';

export const LayoutLoader = React.memo(() => {
  return (
    <Layout><Loader /></Layout>
  );
});
