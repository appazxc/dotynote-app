import { Text } from '@chakra-ui/react';
import React from 'react';

import { useFreePlanUpgrade } from 'shared/api/hooks/useFreePlanUpgrade';
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

const CREDITS_FREE_UPGRADE_LIMIT = 5000;

const NotImplementedBillingModal = (props: Props) => {
  const { isOpen = true } = props;
  const dispatch = useAppDispatch();
  const balance = useUserBalanceInfo();
  const subscription = useUserSubscription();
  const { mutateAsync: upgrade, isPending } = useFreePlanUpgrade();
  
  const isChangedMoreThan5DaysAgo = React.useMemo(() => {
    if (!subscription) {
      return false;
    }

    const updatedAt = new Date(subscription.updatedAt);
    updatedAt.setDate(updatedAt.getDate() + 5);
    return updatedAt < new Date();
  }, [subscription]);
  const hasRemainingCredits = balance.remainingCredits > 0;
  const possibleToUpgrade = balance.credits < CREDITS_FREE_UPGRADE_LIMIT;
  const showUpgrade = possibleToUpgrade && !hasRemainingCredits && isChangedMoreThan5DaysAgo;
  const upgradeText = 'But as a thank you for your interest, we want to offer you a free upgrade. '
  + 'Click the button below to receive increased limits.';

  const handleSubmit = React.useCallback(async () => {
    if (showUpgrade) {
      try {
        await upgrade();
      } catch (error) {
        console.error(error);
      }
    }

    dispatch(hideModal());
  }, [dispatch, upgrade, showUpgrade]);

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
            Subscriptions aren{apos}t available yet — we{apos}re working on it! {showUpgrade ? upgradeText : ''}
          </Text>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="subtle"
            loading={isPending}
            onClick={handleSubmit}
          >
            {showUpgrade ? 'Upgrade' : 'Got it'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default NotImplementedBillingModal;