import { Container, HStack, Input } from '@chakra-ui/react';
import React from 'react';

import { CloseButton } from 'shared/components/ui/close-button';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { toggleSearch } from 'shared/store/slices/appSlice';

type Props = {
  value: string;
  onChange: (value: string) => void;
  showCancelButton?: boolean;
};

export const PostsSearch = React.memo(({ value, showCancelButton, onChange }: Props) => {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobile);

  const handleSearch = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange]);

  React.useEffect(() => () => onChange(''), [onChange]);

  return (
    <Container
      py="2"
      px="4"
      maxW="3xl"
    >
      <HStack gap="2">
        <Input
          autoFocus
          placeholder="Search"
          variant="subtle"
          value={value}
          size={isMobile ? 'sm' : 'md'}
          onChange={handleSearch}
        />
        {showCancelButton && (
          <CloseButton
            size="xs"
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
