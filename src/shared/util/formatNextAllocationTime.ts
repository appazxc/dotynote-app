export const formatNextAllocationTime = (nextResetAt: string | number | Date | null): string => {
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
