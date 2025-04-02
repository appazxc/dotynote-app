import { usePlans } from 'shared/api/hooks/usePlans';
import { useUserSubscription } from 'shared/api/hooks/useUserSubscription';
import { Loader } from 'shared/components/Loader';
import { BillingContent } from 'shared/modules/billing/BillingContent';
import { subscriptionPlanSelector, subscriptionSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

import { SettingsLayout } from 'desktop/components/SettingsLayout';

function Billing() {
  const { data: planIds, isFetched: isPlansFetched } = usePlans();
  const { data: subscriptionId, isFetched: isSubscriptionFetched } = useUserSubscription();

  const plans = useAppSelector(state => subscriptionPlanSelector.getEntitiesById(state, planIds));
  const subscription = useAppSelector(state => subscriptionSelector.getEntityById(state, subscriptionId));

  const isFetched = isPlansFetched && isSubscriptionFetched;

  return (
    <SettingsLayout>
      {isFetched 
        ? <BillingContent currentSubscription={subscription} plans={plans} /> 
        : <Loader height="200px" delay={300} />}
    </SettingsLayout>
  );
}

export default Billing;
