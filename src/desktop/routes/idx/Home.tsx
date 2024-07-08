import React from 'react';

import { Box, Button, Container, useTheme } from '@chakra-ui/react';

import { LoginForm } from 'shared/components/forms/LoginForm/LoginForm';
import { Logo } from 'shared/components/Logo';
import { useAppSelector } from 'shared/store/hooks';
import { selectToken } from 'shared/store/slices/authSlice';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout, LayoutHeader } from 'desktop/components/Layout';

export const Home = React.memo(() => {
  const hasToken = !!useAppSelector(selectToken);
  const theme = useTheme();
  console.log('theme', theme);
  const [showLoginForm] = React.useState(!hasToken);
  
  const renderedAppButton = React.useMemo(() => {
    return (
      <Box>
        <Button
          as={DesktopLink}
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
    <Layout header={<LayoutHeader left={<DesktopLink to="/"><Logo p="2" /></DesktopLink>} />}>
      <Container pt="36" maxW="md">
        {showLoginForm ? <LoginForm /> : renderedAppButton}
      </Container>
    </Layout>
  );
});
