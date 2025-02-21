import { api } from 'shared/api';
import { noteSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

type Params = {
  noteId?: number | null;
  postIds: number[];
  parentId: number;
  concretePostId?: number;
  place?: 'top' | 'bottom';
}

const revertPlaceMap = {
  'top': 'bottom',
  'bottom': 'top',
} as const;

export const stickNotes = (params: Params): ThunkAction => (_, getState) => {
  const parentNote = noteSelector.getEntityById(getState(), params.parentId);

  invariant(parentNote, 'Missing parentNote');
  
  const data = params;

  if (params.place && parentNote.postsSettings?.sort === 'asc') {
    data.place = revertPlaceMap[params.place];
  }

  return api.post('/notes/stick', data);
};