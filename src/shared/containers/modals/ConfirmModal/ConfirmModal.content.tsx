import { Text } from '@chakra-ui/react';

import { Button } from 'shared/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from 'shared/components/ui/dialog';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { ModalBase } from 'shared/types/modal';

export type Props = ModalBase<{
  title: string;
  description: string;
  isLoading?: boolean;
  confirmText?: string;
  onConfirm: () => void;
}>

const ConfirmModal = (props: Props) => {
  const { title, description, isOpen = true, isLoading, confirmText, onConfirm } = props;
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  return (
    <DialogRoot
      placement="center"
      open={isOpen}
      size={isMobile ? '2xs' : 'xs'}
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogContent backdrop>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody><Text fontSize="md">{description}</Text></DialogBody>
        <DialogFooter>
          <Button variant="subtle" onClick={() => dispatch(hideModal())}>Cancel</Button>
          <Button
            loading={isLoading}
            colorPalette="red"
            variant="subtle"
            onClick={onConfirm}
          >
            {confirmText || 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default ConfirmModal;