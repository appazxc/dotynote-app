import { Button } from '@chakra-ui/react';
import { Layout, LayoutHeader } from 'mobile/components/Layout';
import React from 'react';
import { useNavigate } from 'react-router';

export const Search = () => {
  const navigate = useNavigate();

  return (
    <Layout header={<LayoutHeader>SearchPage</LayoutHeader>}>
      <div>content</div>
      <Button onClick={() => navigate('/tabs')}>go to tabs</Button>
    </Layout>
  );
};
