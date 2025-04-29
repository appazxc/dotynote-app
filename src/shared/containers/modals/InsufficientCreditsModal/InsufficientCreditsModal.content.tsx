import { Box, Flex, Icon, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { FiLock, FiArrowRight } from 'react-icons/fi';

import { Button } from 'shared/components/ui/button';
import { 
  DialogRoot,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {};

const InsufficientCreditsModal: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGoToPlans = () => {
    dispatch(hideModal());
    navigate({ to: '/app/billing' });
  };

  return (
    <DialogRoot
      open
      placement="center"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogContent className="max-w-md">
        <Box
          position="relative"
          overflow="hidden"
          pb={4}
        >
          <DialogHeader className="text-center" pb={2}>
            <Flex justifyContent="center" mb={3}>
              <Icon
                as={FiLock}
                boxSize={7}
                color="blue.500"
              />
            </Flex>
            <Text fontSize="xl" fontWeight="bold">Credit Limit Reached</Text>
          </DialogHeader>
          
          <DialogCloseTrigger />
          
          <DialogBody>
            <VStack gap={5} align="stretch">
              <Text textAlign="center">
                Creating this content requires more credits than available on your current plan.
              </Text>
              
              <Text
                textAlign="center"
                fontSize="sm"
                color="gray.700"
              >
                Upgrade to get more credits and continue creating without interruptions.
              </Text>
              
              <Button 
                variant="solid"
                colorScheme="blue"
                size="md"
                width="full"
                onClick={handleGoToPlans}
              >
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  width="full"
                >
                  <Text>View Plans</Text>
                  <Icon as={FiArrowRight} />
                </Flex>
              </Button>
            </VStack>
          </DialogBody>
        </Box>
      </DialogContent>
    </DialogRoot>
  );
};

export default InsufficientCreditsModal; 