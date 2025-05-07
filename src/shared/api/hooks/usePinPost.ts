import { useMutation } from '@tanstack/react-query';

import { pinPost } from 'shared/actions/post/pinPost';
import { useAppDispatch } from 'shared/store/hooks';

export const usePinPost = () => {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: (postId: string) => {
      return dispatch(pinPost(postId));
    },
  });
};
