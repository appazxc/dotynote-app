export const makeModalId = (id: string, modalKey: string | number = '') => {
  return `${id}${modalKey}`;
};