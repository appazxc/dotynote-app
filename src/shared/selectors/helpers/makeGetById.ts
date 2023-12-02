export const makeGetById = (entityName) => {
  return (state, id) => {
    return state.entities[entityName][id] || null;
  };
};