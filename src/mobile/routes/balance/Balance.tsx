import { Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { BalanceContent } from 'shared/modules/balance/BalanceContent';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';

const Billing = React.memo(() => {
  const navigate = useNavigate();
  return (
    <Layout
      header={(
        <LayoutHeader
          showBackButton
          title="Balance"
          onBackButtonClick={() => {
            navigate({ to: '/app/menu' });
          }}
        />
      )}
    >
      <Container py="10" maxW="md">
        <BalanceContent />
      </Container>
    </Layout>
  );
});

export default Billing;