const titleMap = {
  'position': 'Personalized',
  'created': 'Date created',
  'updated': 'Date updated',
};

export const getOptionTitleFromOrderType = (orderType: string) => {
  return titleMap[orderType];
};