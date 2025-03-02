import { Box } from '@chakra-ui/react';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteVideoEntity } from 'shared/types/entities/NoteVideoEntity';

type Props = {
  noteId: number;
  noteVideo: NoteVideoEntity,
};

export const NoteVideoModalMobile = React.memo(({ noteVideo }: Props) => {
  const dispatch = useAppDispatch();
  
  return (
    <DialogRoot
      defaultOpen
      placement="center"
      size="xs"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogBody>
              hello
        </DialogBody>
    
        <DialogFooter
          p="0"
          borderTop="1px solid"
          borderColor="gray.100"
          mt="4"
        >
          <Button
            width="full"
            colorScheme="brand"
            variant="ghost"
            onClick={() => dispatch(hideModal())}
          >
                Ok
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
});
