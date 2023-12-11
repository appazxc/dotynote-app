import { tabNames } from "shared/modules/space/constants/tabNames";
import { getTabMatch } from "shared/modules/space/helpers/tabHelpers";
import { spaceTabSelector } from "shared/selectors/entities";
import { selectSpaceTabs } from "shared/store/slices/appSlice";
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import Essense from "../helpers/Essence";

export class NoteEssence extends Essense<NoteEntity> {
  async loadTabNotes(spaceId: string) {
    const state = this.store.getState();
    const noteIds = selectSpaceTabs(state, spaceId)
      .map(id => {
        const spaceTab = spaceTabSelector.getById(state, id);

        if (!spaceTab || !spaceTab.routes.length) {
          return false;
        }

        const { routes } = spaceTab;
        const match = getTabMatch(routes[0]);

        if (!match || match.route.name !== tabNames.note) {
          return false;
        }

        return match.pathMatch.params.noteId;
      })
      .filter(Boolean);

    return this.loadList({ filters: { ids: noteIds } });
  }
}
