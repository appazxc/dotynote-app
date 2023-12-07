import { ThunkAction } from "shared/store";
import { selectActiveSpace } from "shared/store/slices/appSlice";
import { invariant } from "shared/util/invariant";
import { createTab } from "./createTab";
import { buildTabUrl } from "shared/modules/space/util/buildTabUrl";
import { tabNames } from "shared/modules/space/constants/tabNames";

export const openMainSpaceNote = (): ThunkAction => async (dispatch, getState) => {
  const space = selectActiveSpace(getState());

  invariant(space, 'Missing space');

  const route = space.mainNoteId 
    ? buildTabUrl({
      routeName: tabNames.note,
      pathParams: { noteId: space.mainNoteId }
    }) 
    : buildTabUrl({
      routeName: tabNames.addMainNote,
    });
  
  await dispatch(createTab({
    route,
    makeActive: true,
    spaceId: space.id,
  }));
};
