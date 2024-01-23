export const getNextActiveTabId = (tabIds: string[], closedTabId: string): string | null => {
  const index = tabIds.indexOf(closedTabId);

  if (index === -1) {
    // log error
    return null;
  }

  if (index >= 1) {
    return tabIds[index - 1];
  }

  if (index === 0 && tabIds.length > 1) {
    return tabIds[1];
  }

  return null;
};