import { useMutation } from '@tanstack/react-query';

import { useAppDispatch } from 'shared/store/hooks';
import { setRefreshToken, setToken } from 'shared/store/slices/authSlice';

import { api } from '..';

type AuthData = { code: string } | { token: string };
type Data = { email: string; referralCode?: string } & AuthData ;

export const useLoginEmailConfirm = () => {
  const dispatch = useAppDispatch();
  
  return useMutation({
    mutationFn: (data: Data) => {
      return api.post<{ token: string; refreshToken: string }>('/auth/login/email/confirm', data);
    },
    onSuccess: async ({ token, refreshToken }) => {
      dispatch(setToken(token));
      dispatch(setRefreshToken(refreshToken));
    },
  });
};
