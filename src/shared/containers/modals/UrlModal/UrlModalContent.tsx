import {
  Button,
  DialogTitle,
  Input,
} from '@chakra-ui/react';
import { Editor } from '@tiptap/core';
import React from 'react';

import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from 'shared/components/ui/dialog';
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
    <DialogRoot
      placement="center"
      open={isOpen}
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader><DialogTitle>URL</DialogTitle></DialogHeader>
        <DialogCloseTrigger />
        <DialogBody><Input value={url} onChange={(e) => setUrl(e.target.value)} /></DialogBody>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default UrlModal;