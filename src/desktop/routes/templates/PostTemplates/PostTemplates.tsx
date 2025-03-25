import { Container } from '@chakra-ui/react';

import { DefaultLayoutHeader } from 'desktop/components/DefaultLayoutHeader';
import { Layout } from 'desktop/components/Layout';

const PostTemplates = () => {
  return (
    <Layout header={<DefaultLayoutHeader showBackButton title="Post Templates" />}>
      <Container pt="10" maxW="3xl">
        Post Templates
      </Container>
    </Layout>
  );
};

export default PostTemplates; 