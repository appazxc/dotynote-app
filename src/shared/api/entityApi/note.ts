import union from 'lodash/union';

import { entityNames } from 'shared/constants/entityNames';
import { getTabMatch } from 'shared/modules/space/helpers/tabHelpers';
import { noteSettingsSelector, spaceSelector, spaceTabSelector } from 'shared/selectors/entities';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';

import Essense from './Essence';

export class NoteEssence extends Essense<NoteEntity> {
  async loadTabNotes(spaceId: string | undefined, router, noteRoutePath) {

    const state = this.store.getState();
    const space = spaceSelector.getEntityById(state, spaceId);

    if (!space) {
      return [];
    }

    const noteIds = union(space.tabs
      .map(({ id }) => {
        const spaceTab = spaceTabSelector.getEntityById(state, id);

        if (!spaceTab || !spaceTab.routes.length) {
          return false;
        }

        const { routes } = spaceTab;
        const match = getTabMatch(routes[routes.length - 1], router);

        if (!match || match.routeId !== noteRoutePath) {
          return false;
        }

        return match.params.noteId;
      })
      .filter(Boolean));

    if (!noteIds.length) {
      return [];
    }

    return this.loadList({ filters: { ids: noteIds, pageSize: 100 } });
  }

  async updateSettings(noteId: number, noteSettingsId: string, data: Partial<NoteSettingsEntity>) {
    return this.updateRelation({
      parentId: noteId,
      relationId: noteSettingsId,
      data,
      relation: 'settings',
      relationType: entityNames.noteSettings,
      relationSelector: noteSettingsSelector,
    });
  }
}
