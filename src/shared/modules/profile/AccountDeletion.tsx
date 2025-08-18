import { Box, BoxProps, Card, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

import { useAccountDeletionRequest } from 'shared/api/hooks/useAccountDeletionRequest';
import { useCancelAccountDeletion } from 'shared/api/hooks/useCancelAccountDeletion';
import { useRequestAccountDeletion } from 'shared/api/hooks/useRequestAccountDeletion';
import { Button } from 'shared/components/ui/button';
import { Icon } from 'shared/components/ui/icon';
import { modalIds } from 'shared/constants/modalIds';
import { ConfirmModal } from 'shared/containers/modals/ConfirmModal';
import { hideModal, showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

type Props = BoxProps;

export const AccountDeletion = React.memo(({ ...boxProps }: Props) => {
  const dispatch = useAppDispatch();
  
  // API hooks
  const { data: deletionRequest, isLoading: isLoadingStatus } = useAccountDeletionRequest();
  const requestDeletion = useRequestAccountDeletion();
  const cancelDeletion = useCancelAccountDeletion();

  const isPendingDeletion = deletionRequest?.status === 'pending';
  const isConfirmedDeletion = deletionRequest?.status === 'confirmed';
  const isLoading = isLoadingStatus || requestDeletion.isPending || cancelDeletion.isPending;

  const handleRequestDeletion = () => {
    dispatch(showModal({
      id: modalIds.confirm,
      extraId: 'delete-account',
    }));
  };

  const handleCancelDeletion = () => {
    dispatch(showModal({
      id: modalIds.confirm,
      extraId: 'cancel-deletion',
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box {...boxProps}>
      <VStack gap="6" alignItems="stretch">
        {(isPendingDeletion || isConfirmedDeletion) && deletionRequest ? (
          <Card.Root
            bg="red.50"
            borderColor="red.200"
            borderWidth="1px"
            colorPalette="red"
          >
            <Card.Body p="6">
              <VStack gap="4" alignItems="stretch">
                <HStack
                  gap="3"
                  alignItems="flex-start"
                >
                  <Icon fontSize="30px" color="colorPalette.fg"><IoAlertCircleOutline /></Icon>
                  <VStack 
                    gap="1" 
                    alignItems="flex-start" 
                    flex="1"
                  >
                    <Text 
                      fontSize="lg" 
                      fontWeight="600" 
                      color="colorPalette.fg"
                    >
                      {isPendingDeletion ? 'Deletion Pending' : 'Deletion Confirmed'}
                    </Text>
                  </VStack>
                </HStack>
                
                <VStack gap="3" alignItems="stretch">
                  <Text 
                    fontSize="sm" 
                    color="colorPalette.fg"
                  >
                    Your account deletion was requested on {formatDate(deletionRequest.createdAt)}.
                    {deletionRequest.scheduledDeletionAt && (
                      <> Deletion will complete in 72 hours.</>
                    )}
                  </Text>

                  <Text 
                    fontSize="sm" 
                    color="colorPalette.fg"
                  >
                    {isPendingDeletion 
                      // eslint-disable-next-line max-len
                      ? 'Please check your email to confirm the deletion. If you change your mind, you can cancel the deletion below.' 
                      : 'If you change your mind, you can cancel the deletion.'}
                  </Text>

                  <Button
                    colorPalette="red"
                    variant="outline"
                    size="sm"
                    alignSelf="flex-start"
                    loading={cancelDeletion.isPending}
                    onClick={handleCancelDeletion}
                  >
                    Cancel Deletion
                  </Button>
                </VStack>
              </VStack>
            </Card.Body>
          </Card.Root>
        ) : (
          <Card.Root colorPalette="gray">
            <Card.Body p="6">
              <Text 
                fontSize="md" 
                fontWeight="600"
                mb="2"
              >
                Account Management
              </Text>
                
              <Text
                fontSize="sm"
                color="colorPalette.fg"
                mb="4"
              >
                This action cannot be undone. All your notes, files, and data will be permanently deleted.
              </Text>

              <Button
                colorPalette="red"
                variant="subtle"
                size="sm"
                alignSelf="flex-start"
                loading={requestDeletion.isPending}
                disabled={isLoading}
                onClick={handleRequestDeletion}
              >
                    Delete Account
              </Button>
            </Card.Body>
          </Card.Root>
        )}
      </VStack>

      <ConfirmModal
        title="Delete Account"
        description="This action cannot be undone. All your notes, files, and data will be permanently deleted. 
        You will receive an email to confirm this action."
        confirmText="Confirm Deletion"
        extraId="delete-account"
        onConfirm={() => {
          dispatch(hideModal());
          requestDeletion.mutate();
        }}
      />
      
      <ConfirmModal
        title="Cancel Deletion"
        description="Are you sure you want to cancel your account deletion?"
        confirmText="Cancel Deletion"
        cancelText="Return"
        extraId="cancel-deletion"
        onConfirm={() => {
          dispatch(hideModal());
          cancelDeletion.mutate();
        }}
      />
    </Box>
  );
});
