import { usePlans } from 'shared/api/hooks/usePlans';
import { Loader } from 'shared/components/Loader';
import { useUserSubscription } from 'shared/hooks/useUserSubscription';
import { BillingContent } from 'shared/modules/billing/BillingContent';
import { subscriptionPlanSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

import { SettingsLayout } from 'desktop/components/SettingsLayout';

function Billing() {
  const { data: planIds, isFetched: isPlansFetched } = usePlans();
  const subscription = useUserSubscription();
  const plans = useAppSelector(state => subscriptionPlanSelector.getEntitiesById(state, planIds));
  const isFetched = isPlansFetched && !!subscription;

  return (
    <SettingsLayout>
      {isFetched 
        ? <BillingContent currentSubscription={subscription} plans={plans} /> 
        : <Loader height="200px" delay={300} />}
    </SettingsLayout>
  );
}

export default Billing;
