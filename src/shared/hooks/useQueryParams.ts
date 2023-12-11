import React from 'react';

import { useSearchParams } from 'react-router-dom';

export const useQueryParams = () => {
  const [searchParams] = useSearchParams();

  return React.useMemo(() => {
    return Object.fromEntries([...searchParams]);
  }, [searchParams]);
};
