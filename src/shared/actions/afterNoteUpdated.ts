import uniqBy from 'lodash/uniqBy';

import { getInfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';
import { SORT_ORDER_IDS } from 'shared/constants/sortOrders';
import { postSelector } from 'shared/selectors/entities';
import { selectAllPostsWithConcreteNote } from 'shared/selectors/post/selectAllPostsWithConcreteNote';
import { ThunkAction } from 'shared/types/store';

const invalidatePostsQueryIfNeeded = (noteId: number): ThunkAction => (_, getState) => {
  const postIds = uniqBy(selectAllPostsWithConcreteNote(getState(), noteId), 'parentId').map(({ id }) => id);
  const posts = postSelector.getEntitiesById(getState(), postIds);

  posts
    .filter(({ parent }) => parent.postsSettings?.orderById === SORT_ORDER_IDS.UPDATED)
    .forEach(({ parent }) => {
      queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(parent.id).slice(0, 2) });
    });
};

export const afterNoteUpdated = (noteId: number): ThunkAction => (dispatch) => {
  dispatch(invalidatePostsQueryIfNeeded(noteId));
};