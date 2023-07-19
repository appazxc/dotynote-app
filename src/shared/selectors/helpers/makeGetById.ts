import { AppState } from 'shared/store';

export const makeGetById = (entityName) => {
  return (state: AppState, id: string) => {
    return state.entities[entityName][id] || null;
  };
};
