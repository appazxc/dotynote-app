import { queries } from "shared/api/queries";
import { queryClient } from "shared/api/queryClient";
import { USER_ID } from "shared/constants/queryParams";
import { hour } from "shared/constants/time";
import { ThunkAction } from "shared/store";
import { selectActiveSpaceId, updateActiveSpaceId } from "shared/store/slices/appSlice";
import { selectUser } from "shared/store/slices/authSlice";

export const loadSpacesAndMakeActive = (): ThunkAction => async (dispatch, getState) => {
  const activeSpaceId = selectActiveSpaceId(getState());
  const user = selectUser(getState());
    
  const userSpaceIds = await queryClient.fetchQuery({
    ...queries.spaces.list({ [USER_ID]: user?.id }), 
    staleTime: hour, 
  });
  
  if (userSpaceIds.length && !activeSpaceId && userSpaceIds.includes(activeSpaceId as string)) {
    dispatch(updateActiveSpaceId(userSpaceIds[0]));
  }
};
