import {
  Box,
  Input,
} from '@chakra-ui/react';
import React from 'react';
import { useDebounceValue } from 'usehooks-ts';

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { SearchResults } from './SearchResults';

export type Props = {
  title?: string,
  onSelect?: (id: string) => void,
}

const DEFAULT_TITLE = 'Select note';

const SelectNoteModal = (props: Props) => {
  const { 
    onSelect,
    title = DEFAULT_TITLE,
  } = props;
  const dispatch = useAppDispatch();
  const [query, setQuery] = React.useState('');
  const [debouncedQuery] = useDebounceValue<string>(query, 500);

  const handleOnChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  return (
    <DialogRoot
      defaultOpen
      placement="center"
      size="xl"
      scrollBehavior="inside"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent h="80vh">
        <DialogHeader pb="1">{title}</DialogHeader>
        <DialogCloseTrigger />
        <DialogBody
          pt="0"
          pb="4"
          px="0"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          display="flex"
          flexDirection="column"
        >
          <Box
            position="sticky"
            zIndex="1"
            top="0"
            pt="1"
            mb="4"
            pb="2"
            px="6"
          >
            <Input
              placeholder="Search..."
              onChange={handleOnChange}
            />
          </Box>
          <Box px="6" flexGrow="1">
            <SearchResults query={debouncedQuery} onClick={onSelect} />
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default SelectNoteModal;