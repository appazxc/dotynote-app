import { useMutation } from '@tanstack/react-query';

import { getUser } from 'shared/actions/auth';
import { useAppDispatch } from 'shared/store/hooks';
import { setToken } from 'shared/store/slices/authSlice';

import { api } from '..';

type AuthData = { code: string } | { token: string };
type Data = { email: string } & AuthData;

export const useLoginEmail = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: Data) => {
      return api.post<{ token: string }>('/auth/login-email', data);
    },
    onSuccess: async ({ token }) => {
      dispatch(setToken(token));
      await dispatch(getUser());
    },
  });
};
