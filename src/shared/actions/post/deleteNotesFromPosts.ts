import uniq from 'lodash/uniq';

import { api } from 'shared/api';
import { getPinnedPostsCountQueryKey } from 'shared/api/options/posts';
import { queryClient } from 'shared/api/queryClient';
import { entityNames } from 'shared/constants/entityNames';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { postSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { removePostIdsFromQuery } from 'shared/util/api/removePostIdsFromQuery';

export const deleteNotesFromPosts = (parentId: string, postIds: string[]): ThunkAction => 
  async (dispatch, getState) => {
    const posts = postSelector.getEntitiesById(getState(), postIds);
    const noteIds = posts.map((post) => post.noteId);
    const revert = removePostIdsFromQuery(parentId, postIds, false);
    const wasPinnedIn: string[] = [];

    posts.forEach((post) => {
      if (post.pinnedAt) {
        wasPinnedIn.push(post.parentId);
      }
    });

    try {
      await api.delete('/notes', {
        noteIds,
      });

      Object
        .entries(getState().entities.post)
        .filter(([_, post]) => 
          noteIds.includes(post.noteId) 
          && !postIds.includes(post.id) // already deleted
        )
        .map(([_, post]) => post)
        .forEach((post) => {
          removePostIdsFromQuery(post.parentId, [post.id]);

          if (post.pinnedAt) {
            wasPinnedIn.push(post.parentId);
          }

          setTimeout(() => {
            dispatch(deleteEntity({ id: post.id, type: entityNames.post }));
          }, 1000);
        });

      noteIds.forEach((id) => {
        dispatch(updateEntity({ id, type: entityNames.note, data: { _isDeleted: true } }));
      });

      if (wasPinnedIn.length) {
        uniq(wasPinnedIn).forEach((parentId) => {
          queryClient.invalidateQueries({ queryKey: getPinnedPostsCountQueryKey(parentId) });
        });
      }
    } catch(error) {
      const parsedError = parseApiError(error);
      if (parsedError.statusCode !== 404) {
        revert();
      }
    }
  };