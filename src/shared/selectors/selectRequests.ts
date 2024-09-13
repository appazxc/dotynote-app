import { createSelector } from '@reduxjs/toolkit';

import { AppState } from 'shared/types/store';

export const selectRequests = createSelector([
  (state: AppState) => state.request.requestIds,
  (state: AppState) => state.request.byId,
], 
(ids, byId) => {
  return ids.map((id) => byId[id]);
});