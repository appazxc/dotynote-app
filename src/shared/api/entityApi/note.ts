import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { getTabMatch } from 'shared/modules/space/helpers/tabHelpers';
import { spaceTabSelector } from 'shared/selectors/entities';
import { IdentityType } from 'shared/types/entities/BaseEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';

import Essense from './Essence';

export class NoteEssence extends Essense<NoteEntity> {
  async loadTabNotes(tabIds: IdentityType[]) {
    const state = this.store.getState();
    const noteIds = tabIds
      .map((id) => {
        const spaceTab = spaceTabSelector.getById(state, id);

        if (!spaceTab || !spaceTab.routes.length) {
          return false;
        }

        const { routes } = spaceTab;
        const match = getTabMatch(routes[routes.length - 1]);

        if (!match || match.routeId !== '/n/$noteId') {
          return false;
        }

        return match.params.noteId;
      })
      .filter(Boolean);

    if (!noteIds.length) {
      return [];
    }
    
    return this.loadList({ filters: { ids: noteIds, pageSize: 100 } });
  }
}
