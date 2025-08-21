import { Text } from '@chakra-ui/react';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogRoot,
} from 'shared/components/ui/dialog';
import { apos } from 'shared/constants/htmlCodes';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';
import { useUserSubscription } from 'shared/hooks/useUserSubscription';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { ModalBase } from 'shared/types/modal';

export type Props = ModalBase<{}>

const NotImplementedBillingModal = (props: Props) => {
  const { isOpen = true } = props;
  const dispatch = useAppDispatch();
  
  const handleSubmit = React.useCallback(async () => {
    dispatch(hideModal());
  }, [dispatch]);

  return (
    <DialogRoot
      placement="center"
      open={isOpen}
      size="xs"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogContent backdrop>
        <DialogBody
          p="4"
          pt="10"
        >
          <Text
            fontSize="lg"
            textAlign="center"
            mb="4"
          >
            Thanks for your interest in Dotynote!
          </Text>
          <Text fontSize="md" textAlign="center">
            Subscriptions aren{apos}t available yet — we{apos}re working on it!
          </Text>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="subtle"
            onClick={handleSubmit}
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default NotImplementedBillingModal;