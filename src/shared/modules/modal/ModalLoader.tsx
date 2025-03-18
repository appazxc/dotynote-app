import { Center } from '@chakra-ui/react';

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
  delay?: number;
}

export const ModalLoader = ({ delay }: Props) => {
  const dispatch = useAppDispatch();
  
  return (
    <Wait delay={delay ?? 1000}>
      <DialogRoot
        defaultOpen
        placement="center"
        size="xs"
        onOpenChange={() => dispatch(hideModal())}
      >
        <DialogBackdrop />
        <DialogContent>
          <DialogBody p="0">
            <Center h="150px">
              <Loader delay={0} />
            </Center>
          </DialogBody>
        </DialogContent>
      </DialogRoot>
    </Wait>
  );
};
