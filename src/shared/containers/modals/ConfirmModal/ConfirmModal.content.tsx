import { Button } from 'shared/components/ui/button';
import { useColorModeValue } from 'shared/components/ui/color-mode';
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
import { ModalBase } from 'shared/types/modal';

export type Props = ModalBase<{
  title: string,
  description: string,
  isLoading?: boolean,
  confirmText?: string,
  onConfirm: () => void,
}>

const ConfirmModal = (props: Props) => {
  const { title, description, isOpen = true, isLoading, confirmText, onConfirm } = props;
  const dispatch = useAppDispatch();
  const borderColor = useColorModeValue('gray.100', 'brand.400');

  return (
    <DialogRoot
      placement="center"
      open={isOpen}
      size="xs"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader
          pb="1"
          px="4"
          textAlign="center"
          fontSize="md"
        >
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody px="4" textAlign="center">{description}</DialogBody>
        <DialogFooter
          p="0"
          borderTop="1px solid"
          borderColor={borderColor}
          mt="4"
        >
          <Button
            variant="ghost"
            width="50%"
            borderRadius="0"
            borderBottomLeftRadius="md"
            onClick={() => dispatch(hideModal())}
          >
            Close
          </Button>
          <Button
            width="50%"
            borderRadius="0"
            borderBottomRightRadius="md"
            loading={isLoading}
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