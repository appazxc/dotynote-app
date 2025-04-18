import React from 'react';

import { selectUserBalance } from 'shared/selectors/user/selectUserBalance';
import { useAppSelector } from 'shared/store/hooks';

const defaultInfo = {
  credits: 0,
  usedCredits: 0,
  reservedCredits: 0,
  totalUsedCredits: 0,
  realTotalUsedCredits: 0,
  remainingCredits: 0,
  nextUpdateIn: 'unknown',
};

const formatNextUpdateTime = (nextResetAt: string | number | Date): string => {
  if (!nextResetAt || nextResetAt === 'unknown') {
    return 'unknown';
  }
  
  const now = new Date();
  const resetDate = new Date(nextResetAt);
  
  // Если дата уже прошла или меньше 5 часов осталось
  const diffHours = (resetDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (diffHours <= 5) {
    return 'soon';
  }
  
  // Рассчитываем разницу в днях
  const diffDays = Math.ceil(diffHours / 24);
  if (diffDays === 0) {
    return 'today';
  } else if (diffDays === 1) {
    return 'tomorrow';
  }
  return `in ${diffDays} days`;
};

export const useUserBalanceInfo = () => {
  const balance = useAppSelector(selectUserBalance);

  const info = React.useMemo(() => {
    if (!balance) {
      return defaultInfo;
    }

    const realTotalUsedCredits = balance.usedCredits + balance.reservedCredits;

    return {
      credits: balance.credits,
      usedCredits: balance.usedCredits,
      reservedCredits: balance.reservedCredits,
      totalUsedCredits: Math.min(balance.credits, realTotalUsedCredits),
      realTotalUsedCredits: realTotalUsedCredits,
      remainingCredits: Math.max(0, balance.credits - realTotalUsedCredits),
      nextUpdateIn: formatNextUpdateTime(balance.nextResetAt),
    };
  }, [balance]);

  return info;
};
