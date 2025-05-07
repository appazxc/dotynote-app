import { useMutation } from '@tanstack/react-query';

import { unpinPost } from 'shared/actions/post/unpinPost';
import { api } from 'shared/api';
import { useAppDispatch } from 'shared/store/hooks';

export const useUnpinPost = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (postId: string) => {
      return dispatch(unpinPost(postId));
    },
  });
};
