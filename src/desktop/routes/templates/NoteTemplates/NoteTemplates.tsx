import { Container } from '@chakra-ui/react';

import { DefaultLayoutHeader } from 'desktop/components/DefaultLayoutHeader';
import { Layout } from 'desktop/components/Layout';

const NoteTemplates = () => {
  return (
    <Layout header={<DefaultLayoutHeader showBackButton title="Note Templates" />}>
      <Container pt="10" maxW="3xl">
        Note Templates
      </Container>
    </Layout>
  );
};

export default NoteTemplates; 