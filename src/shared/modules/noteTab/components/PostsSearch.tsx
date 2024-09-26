import React from 'react';

import { Container, HStack, IconButton, Input } from '@chakra-ui/react';
import { MdOutlineCancel } from 'react-icons/md';

import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleSearch } from 'shared/store/slices/appSlice';

type Props = {
  value: string,
  onChange: (value: string) => void,
  showCancelButton?: boolean,
};

export const PostsSearch = React.memo(({ value, showCancelButton, onChange }: Props) => {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobile);

  const handleSearch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange]);

  React.useEffect(() => () => onChange(''), [onChange]);

  return (
    <Container py="2">
      <HStack gap="2">
        <Input
          autoFocus
          placeholder="Search"
          value={value}
          size={isMobile ? 'sm' : 'md'}
          onChange={handleSearch}
        />
        {showCancelButton && (
          <IconButton
            aria-label=""
            variant="unstyled"
            size="sm"
            icon={<MdOutlineCancel size="24" />}
            onClick={() => {
              onChange('');
              dispatch(toggleSearch());
            }}
          />
        )}
      </HStack>
    </Container>
  );
});
