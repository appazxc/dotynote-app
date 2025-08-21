import React from 'react';

import { selectUserBalance } from 'shared/selectors/user/selectUserBalance';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const useUserBalanceInfo = () => {
  const balance = useAppSelector(selectUserBalance);

  invariant(balance, 'Balance is not found');
  
  const info = React.useMemo(() => {
    return {
      credits: balance.credits,
      doty: balance.doty,
      storageCapacity: balance.storageCapacity,
      storageUsage: balance.storageUsage,
      isCreditsAlmostFinished: balance.credits < 100,
      isStorageLimitReached: balance.storageUsage >= balance.storageCapacity,
    };
  }, [balance]);

  return info;
};
