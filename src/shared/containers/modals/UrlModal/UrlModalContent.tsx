import React from 'react';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Editor } from '@tiptap/core';

import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { ModalBase } from 'shared/types/modal';

export type Props = ModalBase<{
  editor: Editor,
}>

const UrlModal = (props: Props) => {
  const { isOpen = true, editor } = props;
  const [url, setUrl] = React.useState(() => editor.getAttributes('link').href);
  const dispatch = useAppDispatch();
  
  const handleConfirm = () => {
    console.log('url', url);
    
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run();
      
      dispatch(hideModal());
      return;
    }
    
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run();
    dispatch(hideModal());
  };

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>URL</ModalHeader>
        <ModalCloseButton />
        <ModalBody><Input value={url} onChange={(e) => setUrl(e.target.value)} /></ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            variant="ghost"
            mr={3}
            onClick={() => dispatch(hideModal())}
          >
            Close
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleConfirm}
          >
            Ok
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UrlModal;