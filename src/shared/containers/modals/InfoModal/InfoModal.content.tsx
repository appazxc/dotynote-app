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

export type Props = {
  title: string;
  description: string;
}

const InfoModal = (props: Props) => {
  const { title, description } = props;
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
        <DialogHeader pb="1"><DialogTitle>{title}</DialogTitle></DialogHeader>
        <DialogBody>
          {description}
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
};

export default InfoModal;