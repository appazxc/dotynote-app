import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const useQuery = () => {
  const [searchParams] = useSearchParams();

  return React.useMemo(() => {
    return Object.fromEntries([...searchParams]);
  }, [searchParams]);
};
