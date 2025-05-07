import { api } from 'shared/api';
import { noteSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

type Params = {
  postIds: string[];
  parentId: string;
  fromNoteId: string;
  place?: 'top' | 'bottom';
  concretePostId?: string;
}

const revertPlaceMap = {
  'top': 'bottom',
  'bottom': 'top',
} as const;

export const movePosts = (params: Params): ThunkAction<Promise<string[]>> => async (_, getState) => {
  const parentNote = noteSelector.getEntityById(getState(), params.parentId);

  invariant(parentNote, 'Missing parentNote');
  
  const data = params;

  if (params.place && parentNote.postsSettings?.sort === 'asc') {
    data.place = revertPlaceMap[params.place];
  }

  return api.post<string[]>('/posts/move', data);
};