import React from 'react';

import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
import { FooterNavigation } from 'mobile/containers/FooterNavigation';

export const Search = () => {
  const navigate = useNavigate();

  return (
    <Layout
      header={<LayoutHeader>SearchPage</LayoutHeader>}
      footer={
        <FooterNavigation isDotMenuDisabled />
      }
    >
      <div>content</div>
      <Button onClick={() => navigate('/tabs')}>go to tabs</Button>
    </Layout>
  );
};
