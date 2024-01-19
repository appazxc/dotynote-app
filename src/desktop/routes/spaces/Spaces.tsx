
import { Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Logo } from 'shared/components/Logo';

import { Layout, LayoutHeader } from 'desktop/components/Layout';

function Spaces() {
  return (
    <Layout header={<LayoutHeader left={<Link to="/"><Logo p="2" /></Link>} />}>
      <Container pt="36" maxW="md">
        hello spaces
      </Container>
    </Layout>
  );
}

export { Spaces };
