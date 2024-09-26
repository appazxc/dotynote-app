import React from 'react';

import { Input } from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import debounce from 'lodash/debounce';

type Props = {
  isMobile?: boolean,
};

export const SearchInput = React.memo(({ isMobile }: Props) => {
  const navigate = useNavigate();
  const { search = '' } = useSearch({ strict: false }); 
  const [value, setValue] = React.useState(search);

  const debouncedNavigate = React.useMemo(() => debounce((value) => {
    // @ts-ignore looks like bug
    navigate({ search: (prev) => ({ ...prev, search: value }), replace: true });
  }, 500), [navigate]);

  const handleChange = React.useCallback((event) => {
    setValue(event.target.value);
    debouncedNavigate(event.target.value);
  }, [debouncedNavigate]);
  
  React.useEffect(() => {
    return () => {
      // @ts-ignore looks like bug
      navigate({ search: (prev) => ({ ...prev, search: undefined }), replace: true });
    };
  }, [navigate]);

  return (
    <Input
      autoFocus
      value={value}
      placeholder="Search"
      size="md"
      _focusVisible={isMobile ? {
        boxShadow: 'none',
      } : undefined}
      onChange={handleChange}
    />
  );
});
