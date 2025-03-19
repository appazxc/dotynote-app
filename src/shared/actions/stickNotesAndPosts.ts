import { api } from 'shared/api';
import { noteSelector } from 'shared/selectors/entities';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

type Params = {
  parentId: number;
  noteIds: number[];
  postIds: number[];
  concretePostId?: number; 
  place?: 'top' | 'bottom'
} 

const revertPlaceMap = {
  'top': 'bottom',
  'bottom': 'top',
} as const;

export const stickNotesAndPosts = (params: Params): ThunkAction<Promise<number[]>> => async (_, getState) => {
  const parentNote = noteSelector.getEntityById(getState(), params.parentId);

  invariant(parentNote, 'Missing parent note');
  
  const data = params;

  if (params.place && parentNote.postsSettings?.sort === 'asc') {
    data.place = revertPlaceMap[params.place];
  }

  return api.post<number[]>('/posts/stick', data);
};