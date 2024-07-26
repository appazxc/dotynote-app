import { AppState } from 'shared/types/store';

export const selectOperation = (state: AppState) => {
  return state.app.operation;
};

export const selectIsOperationActive = (state: AppState) => {
  return !!selectOperation(state).type;
};