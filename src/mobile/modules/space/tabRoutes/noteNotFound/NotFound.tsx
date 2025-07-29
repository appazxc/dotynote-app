import React from 'react';

import { NoteNotFound } from 'shared/modules/noteTab/NoteNotFound';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';

type Props = {};

export const NotFound = React.memo((_props: Props) => {
  const tab = useTabContext();

  return (
    <Layout header={<LayoutHeader showBackButton isBackButtonDisabled={tab.routes.length <= 1} />}>
      <NoteNotFound />
    </Layout>
  );
});

export default NotFound;