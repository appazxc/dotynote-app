import { getInfinityPostsQueryKey } from 'shared/api/hooks/useInfinityPosts';
import { queryClient } from 'shared/api/queryClient';
import { selectUser } from 'shared/selectors/user/selectUser';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';

export const invalidateHubPosts = (): ThunkAction => (_, getState) => {
  const user = selectUser(getState());

  invariant(user, 'Missing user');
  
  if (user?.settings?.hub?.id) {
    queryClient.invalidateQueries({ queryKey: getInfinityPostsQueryKey(user?.settings?.hub?.id).slice(0, 2) });
  }
};