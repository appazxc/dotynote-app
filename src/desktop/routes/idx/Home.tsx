import { Box, Button, Container } from '@chakra-ui/react';
import React from 'react';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';
import { Logo } from 'shared/components/Logo';
import { selectToken } from 'shared/selectors/auth/selectToken';
import { useAppSelector } from 'shared/store/hooks';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout, LayoutHeader } from 'desktop/components/Layout';

const Home = React.memo(() => {
  const hasToken = !!useAppSelector(selectToken);

  const [showLoginForm] = React.useState(!hasToken);
  
  const renderedAppButton = React.useMemo(() => {
    return (
      <Box>
        <Button
          asChild
          width="full"
        >
          <DesktopLink to="/app">Open App</DesktopLink>
        </Button>
      </Box>
    );
  }, []);

  return (
    <Layout header={<LayoutHeader left={<DesktopLink to="/"><Logo p="2" /></DesktopLink>} />}>
      <Container pt="36" maxW="md">
        {showLoginForm ? <LoginForm /> : renderedAppButton}
      </Container>
    </Layout>
  );
});

export default Home;
