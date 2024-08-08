import React from 'react';

import { Loader } from 'shared/components/Loader';

import { FooterNavigation } from 'mobile/containers/FooterNavigation';
import { TabLayout } from 'mobile/modules/space/components/TabLayout';

type Props = {};

export const NotePendingComponent = React.memo((props: Props) => {
  return (
    <TabLayout footer={<FooterNavigation /> }>
      <Loader />
    </TabLayout>
  );
});
