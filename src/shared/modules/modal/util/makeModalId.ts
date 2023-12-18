export const makeModalId = (id: string, extraId: string | number = '') => {
  return `${id}${extraId}`;
};