import { useQuery } from '@tanstack/react-query';

import { options } from '../options';

export const useSpaces = () => {
  return useQuery(options.spaces.userList());
};
