import React from 'react';

import { Input } from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import debounce from 'lodash/debounce';

type Props = {
  isMobile?: boolean,
};

export const HomeSearchInput = React.memo(({ isMobile }: Props) => {
  const navigate = useNavigate();
  const { search = '' } = useSearch({ strict: false }); 
  const [value, setValue] = React.useState(search);

  const debouncedNavigate = React.useMemo(() => debounce((value) => {
    navigate({ search: (prev) => ({ ...prev, search: value }), replace: true });
  }, 500), [navigate]);

  const handleChange = React.useCallback((event) => {
    setValue(event.target.value);
    debouncedNavigate(event.target.value);
  }, [debouncedNavigate]);
  
  return (
    <Input
      value={value}
      placeholder="Search"
      size={isMobile ? 'sm' : 'md'}
      borderRadius="md"
      onChange={handleChange}
    />
  );
});
