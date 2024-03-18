import { IdentityType } from 'shared/types/entities/BaseEntity';

export const getNextActiveTabId = (tabIds: IdentityType[], closedTabId: IdentityType): IdentityType | null => {
  const index = tabIds.indexOf(closedTabId);

  if (index === -1) {
    // log error
    return null;
  }

  if (tabIds.length <= 1) {
    return null;
  }

  if (index === tabIds.length - 1) {
    return tabIds[index - 1];
  }

  return tabIds[index + 1];
};