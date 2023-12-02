import { ThunkAction } from "shared/store";
import { selectActiveSpaceId } from "shared/store/slices/appSlice";
import { invariant } from "shared/util/invariant";

export const createTab = (route: string, spaceId?: string): ThunkAction => (dispatch, getState) => {
  const activeSpaceId = selectActiveSpaceId(getState());

  invariant(!activeSpaceId && !spaceId, 'Missing spaceId');
  
  const tab = {
    spaceId: spaceId || activeSpaceId,
    routes: [route],
    pos: 1000,
  };
};