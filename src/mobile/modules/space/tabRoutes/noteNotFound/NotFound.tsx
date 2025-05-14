import React from 'react';

import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';

type Props = {};

export const NotFound = React.memo((props: Props) => {
  return (
    <Layout header={<LayoutHeader showBackButton />}>
      <NoteNotFound />
    </Layout>
  );
});

export default NotFound;