import { useMutation } from '@tanstack/react-query';

import { getUser } from 'shared/actions/auth';
import { useAppDispatch } from 'shared/store/hooks';
import { setToken } from 'shared/store/slices/authSlice';

import api from '..';

export const useLoginEmail = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: { email: string, code: string }) => {
      return api.post<{ token: string }>('/auth/login-email', data);
    },
    onSuccess: async ({ token }) => {
      dispatch(setToken(token));
      await dispatch(getUser());
    },
  });
};
