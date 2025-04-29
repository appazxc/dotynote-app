import { Box } from '@chakra-ui/react';
import React from 'react';

import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';

import { Layout, LayoutHeader } from 'mobile/components/Layout';

type Props = {};

export const NotFound = React.memo((props: Props) => {
  return (
    <Layout header={<LayoutHeader showBackButton />}>
      <NoteNotFound />
    </Layout>
  );
});

export default NotFound;