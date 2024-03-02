import React from 'react';

import { Box, Button, Container, useTheme } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';
import { Logo } from 'shared/components/Logo';
import { useAppSelector } from 'shared/store/hooks';
import { selectToken } from 'shared/store/slices/authSlice';

import { Layout, LayoutHeader } from 'desktop/components/Layout';

function Home() {
  const hasToken = !!useAppSelector(selectToken);
  const theme = useTheme();
  console.log('theme', theme);
  const [showLoginForm] = React.useState(!hasToken);
  
  const renderedAppButton = React.useMemo(() => {
    return (
      <Box>
        <Button
          as={Link}
          to="/app"
          colorScheme="brand"
          variant="solid"
          width="full"
        >
          Open App
        </Button>
      </Box>
    );
  }, []);

  return (
    <Layout header={<LayoutHeader left={<Link to="/"><Logo p="2" /></Link>} />}>
      <Container pt="36" maxW="md">
        {showLoginForm ? <LoginForm /> : renderedAppButton}
      </Container>
    </Layout>
  );
}

export { Home };
