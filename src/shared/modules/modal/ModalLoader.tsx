import { Box } from '@chakra-ui/react';

import { Loader } from 'shared/components/Loader';
import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogRoot,
} from 'shared/components/ui/dialog';
import { Wait } from 'shared/components/Wait';
import { useAppDispatch } from 'shared/store/hooks';

import { hideModal } from './modalSlice';

type Props = {
  delay?: number,
}

export const ModalLoader = ({ delay }: Props) => {
  const dispatch = useAppDispatch();
  
  return (
    <Wait delay={delay ?? 300}>
      <DialogRoot
        defaultOpen
        placement="center"
        onOpenChange={() => dispatch(hideModal())}
      >
        <DialogBackdrop />
        <DialogContent>
          <DialogBody>
            <Box p="4">
              <Loader delay={0} />
            </Box>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Wait>
  );
};
