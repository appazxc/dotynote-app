import { redirect } from '@tanstack/react-router';

import { options } from 'shared/api/options';
import { queryClient } from 'shared/api/queryClient';
import { hour } from 'shared/constants/time';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { updateActiveSpaceId } from 'shared/store/slices/appSlice';
import { ThunkAction } from 'shared/types/store';

export const loadSpaces = (pathname: string): ThunkAction => async (dispatch, getState) => {
  const spaceIds = await queryClient.fetchQuery({
    ...options.spaces.userList(),
    staleTime: hour,
  });
  
  const activeSpace = selectActiveSpace(getState());

  if (!activeSpace && spaceIds.length) {
    dispatch(updateActiveSpaceId(spaceIds[0]));
    return;
  }
  
  if (!activeSpace && pathname !== '/app/spaces') {
    throw redirect({
      to: '/app/spaces',
    });
  }
};
