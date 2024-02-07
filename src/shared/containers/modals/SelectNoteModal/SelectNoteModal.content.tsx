import React from 'react';

import {
  Box,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useDebounce } from 'usehooks-ts';

import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { SearchResults } from './SearchResults';

export type Props = {
  onSelect?: (id: string) => void,
}

const SelectNoteModal = ({ onSelect }: Props) => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = React.useState('');
  const debouncedQuery = useDebounce<string>(query, 500);

  const handleOnChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  return (
    <Modal
      isCentered
      isOpen
      size="2xl"
      scrollBehavior="inside"
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <ModalContent maxH="80vh">
        <ModalHeader pb="1">Select note</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pt="0"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box
            position="sticky"
            zIndex="1"
            top="0"
          >
            <Input onChange={handleOnChange} />
          </Box>
          <SearchResults query={debouncedQuery} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SelectNoteModal;