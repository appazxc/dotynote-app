import { Box, Center, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { FiLock } from 'react-icons/fi';
import { RiCoinLine } from 'react-icons/ri';

import { Button } from 'shared/components/ui/button';
import {
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
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
          bg="white" 
          color="black" 
          borderRadius="xl"
          p={0}
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
        >
          {/* Close button */}
          <DialogCloseTrigger />

          <VStack align="stretch" gap={0}>
            {/* Header with lock icon */}
            <DialogHeader>
              <HStack
                gap={3}
                align="center"
              >
                <Icon
                  as={FiLock}
                  boxSize={6}
                  color="blue.500"
                />
                <Text 
                  fontSize="2xl" 
                  fontWeight="bold"
                >
                  Credit Limit Reached
                </Text>
              </HStack>
            </DialogHeader>

            {/* Main message */}
            <Box
              px={8}
              pb={6}
              pt={2}
            >
              <Text 
                fontSize="md" 
                color="gray.600"
              >
                Creating this content requires more credits than available on your current plan.
              </Text>
            </Box>

            {/* Main content */}
            <Box px={6} pb={6}>
              {/* Credit option */}
              <Box 
                border="1px solid" 
                borderColor="blue.100" 
                borderRadius="lg" 
                p={4}
                mb={6}
                bg="blue.50"
              >
                <HStack gap={4} justify="space-between">
                  <HStack gap={3}>
                    <Center 
                      boxSize={10} 
                      borderRadius="full" 
                      bg="linear-gradient(45deg, #4299E1, #805AD5)"
                      color="white"
                    >
                      <Icon as={RiCoinLine} boxSize={5} />
                    </Center>
                    <VStack gap={0} align="start">
                      <Text fontWeight="bold">Upgrade your plan</Text>
                      <Text fontSize="sm" color="gray.600">Get more credits instantly</Text>
                    </VStack>
                  </HStack>
                </HStack>
              </Box>

              {/* Visual bar */}
              <Box mb={6}>
                <Box 
                  w="full" 
                  h={3} 
                  mb={1.5}
                  borderRadius="full" 
                  bg="linear-gradient(to right, #4299E1, #805AD5)"
                  opacity={0.3}
                />
                <Box 
                  w="65%" 
                  h={3} 
                  borderRadius="full" 
                  bg="linear-gradient(to right, #4299E1, #805AD5)"
                />
              </Box>

              {/* CTA Button */}
              <Button
                width="full"
                height="56px"
                bg="linear-gradient(to right, #4299E1, #805AD5)"
                _hover={{ bg: 'linear-gradient(to right, #3182CE, #6B46C1)' }}
                color="white"
                fontWeight="bold"
                fontSize="lg"
                borderRadius="md"
                onClick={handleGoToPlans}
              >
                View Plans
              </Button>
            </Box>
          </VStack>
        </Box>
      </DialogContent>
    </DialogRoot>
  );
};

export default InsufficientCreditsModal; 