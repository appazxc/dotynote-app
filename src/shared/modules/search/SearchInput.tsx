import { Input, InputGroup } from '@chakra-ui/react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import debounce from 'lodash/debounce';
import React from 'react';

import { SearchIcon } from 'shared/components/ui/icons';

type Props = {
  isMobile?: boolean;
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
  
  return (
    <InputGroup
      startElement={<SearchIcon size="16px" />}
    >
      <Input
        autoFocus
        value={value}
        placeholder="Search..."
        size="md"
        variant="subtle"
        _focusVisible={isMobile ? {
          boxShadow: 'none',
        } : undefined}
        css={isMobile ? {
          '--focus-color': 'transparent',
        } : {
          '--focus-color': 'transparent',
        }}
        onChange={handleChange}
      />
    </InputGroup>

  );
});
