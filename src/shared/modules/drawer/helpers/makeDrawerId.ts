export const makeDrawerId = (id: string, extraId: string | number = '') => {
  return `${id}${extraId}`;
};