import React from 'react';

import { Container, HStack, IconButton, Input } from '@chakra-ui/react';
import { MdOutlineCancel } from 'react-icons/md';

import { useAppDispatch } from 'shared/store/hooks';
import { toggleSearch } from 'shared/store/slices/appSlice';

type Props = {
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  showCancelButton?: boolean,
};

export const NoteHeaderSearch = React.memo(({ value, showCancelButton, onChange }: Props) => {
  const dispatch = useAppDispatch();
  
  return (
    <Container py="2">
      <HStack gap="2">
        <Input
          placeholder="Search"
          value={value}
          size="md"
          onChange={onChange}
        />
        {showCancelButton && (
          <IconButton
            aria-label="fds"
            variant="unstyled"
            icon={<MdOutlineCancel size="24" />}
            onClick={() => dispatch(toggleSearch())}
          />
        )}
      </HStack>
    </Container>
  );
});
