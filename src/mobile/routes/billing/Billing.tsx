import { Container } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { usePlans } from 'shared/api/hooks/usePlans';
import { Loader } from 'shared/components/Loader';
import { useUserSubscription } from 'shared/hooks/useUserSubscription';
import { BillingContent } from 'shared/modules/billing/BillingContent';
import { subscriptionPlanSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';

const Billing = React.memo(() => {
  const navigate = useNavigate();
  const { data: planIds, isFetched: isPlansFetched } = usePlans();
  const subscription = useUserSubscription();
  const plans = useAppSelector(state => subscriptionPlanSelector.getEntitiesById(state, planIds));
  const isFetched = isPlansFetched && !!subscription;

  return (
    <Layout
      header={(
        <LayoutHeader
          showBackButton
          title="Billing"
          onBackButtonClick={() => {
            navigate({ to: '/app/menu' });
          }}
        />
      )}
    >
      <Container py="10" maxW="md">
        {isFetched 
          ? <BillingContent currentSubscription={subscription} plans={plans} /> 
          : <Loader height="200px" delay={300} />}
      </Container>
    </Layout>
  );
});

export default Billing;