import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { selectActiveSpace } from 'shared/store/slices/appSlice';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

import { createTab } from './createTab';

export const openMainSpaceNote = (): ThunkAction => async (dispatch, getState) => {
  const space = selectActiveSpace(getState());

  invariant(space, 'Missing space');

  const route = space.mainNoteId
    ? buildTabUrl({
      routeName: tabRouteNames.note,
      pathParams: { noteId: space.mainNoteId },
    })
    : buildTabUrl({
      routeName: tabRouteNames.addMainNote,
    });

  dispatch(
    createTab({
      route,
      makeActive: true,
    })
  );
};
