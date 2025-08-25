export const formatNextAllocationTime = (nextResetAt: string | number | Date | null): string => {
  if (!nextResetAt || nextResetAt === 'unknown') {
    return 'unknown';
  }
  
  const now = new Date();
  const resetDate = new Date(nextResetAt);
  
  // If date has passed or less than 5 hours remaining
  const diffHours = (resetDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  if (diffHours <= 5) {
    return 'soon';
  }
  
  // Calculate difference in days
  const diffDays = Math.ceil(diffHours / 24);
  if (diffDays === 0) {
    return 'today';
  } else if (diffDays === 1) {
    return 'tomorrow';
  }
  return `in ${diffDays} days`;
};
