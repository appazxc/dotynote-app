import React from 'react';

import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { FooterNavigation } from 'mobile/containers/FooterNavigation';

export const Account = () => {
  return (
    <Layout
      header={<LayoutHeader>Account</LayoutHeader>}
      footer={(
        <FooterNavigation 
          isDotMenuDisabled
        />
      )}
    >
      <div>content</div>

    </Layout>
  );
};
