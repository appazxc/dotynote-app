import { api } from 'shared/api';
import { noteSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

type Params = {
  postIds: number[];
  parentId: number;
  fromNoteId: number;
  place?: 'top' | 'bottom';
  concretePostId?: number;
}

const revertPlaceMap = {
  'top': 'bottom',
  'bottom': 'top',
} as const;

export const movePosts = (params: Params): ThunkAction => (_, getState) => {
  const parentNote = noteSelector.getEntityById(getState(), params.parentId);

  invariant(parentNote, 'Missing parentNote');
  
  const data = params;

  if (params.place && parentNote.postsSettings?.sort === 'asc') {
    data.place = revertPlaceMap[params.place];
  }

  return api.post('/posts/move', data);
};