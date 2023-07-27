import { AppThunk } from 'shared/store';
import { RouterState } from '@remix-run/router';

export const handleAppRouteChange: AppThunk<RouterState> = (state) => () => {
  console.log('state', state);
  
  const { historyAction } = state;
};
