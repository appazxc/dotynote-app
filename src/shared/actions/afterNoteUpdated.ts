import uniqBy from 'lodash/uniqBy';

import { queryClient } from 'shared/api/queryClient';
import { getInfinityStickTypeQueryKey } from 'shared/modules/noteTab/components/StickTypeList/StickTypeList';
import { noteSelector, postSelector } from 'shared/selectors/entities';
import { selectAllPostsWithConcreteNote } from 'shared/selectors/post/selectAllPostsWithConcreteNote';
import { ThunkAction } from 'shared/types/store';

const invalidatePostsQueryIfNeeded = (noteId: string): ThunkAction => (_, getState) => {
  const postIds = uniqBy(selectAllPostsWithConcreteNote(getState(), noteId), 'parentId').map(({ id }) => id);
  const posts = postSelector.getEntitiesById(getState(), postIds);

  posts
    .filter(({ parentId }) => 
      noteSelector.getEntityById(getState(), parentId)?.postsSettings?.orderBy === 'updatedAt')
    .forEach(({ parentId }) => {
      queryClient.invalidateQueries({ queryKey: getInfinityStickTypeQueryKey(parentId).slice(0, 2) });
    });
};

export const afterNoteUpdated = (noteId: string): ThunkAction => (dispatch) => {
  dispatch(invalidatePostsQueryIfNeeded(noteId));
};