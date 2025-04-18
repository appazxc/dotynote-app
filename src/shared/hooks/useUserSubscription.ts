import { useLoadUserSubscription } from 'shared/api/hooks/useLoadUserSubscription';
import { subscriptionSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';

export const useUserSubscription = () => {
  const { data: id } = useLoadUserSubscription();

  const subscription = useAppSelector(state => subscriptionSelector.getEntityById(state, id));

  return subscription;
};