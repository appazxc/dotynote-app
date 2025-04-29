import { Box, Flex, HStack, Icon, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';
import { FiCreditCard, FiLock } from 'react-icons/fi';

import { Button } from 'shared/components/ui/button';
import { 
  DialogRoot,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogCloseTrigger,
  DialogContent,
} from 'shared/components/ui/dialog';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {};

const InsufficientCreditsModal: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(hideModal());
  };

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
        <Box position="relative" overflow="hidden">
          <Box 
            position="absolute"
            top="-20px"
            left="-20px"
            width="120px"
            height="120px"
            borderRadius="full"
            bg="blue.500"
            opacity="0.1"
          />
          <Box 
            position="absolute"
            bottom="-30px"
            right="-30px"
            width="150px"
            height="150px"
            borderRadius="full"
            bg="purple.500"
            opacity="0.1"
          />
          
          <DialogHeader className="text-center">
            <Flex justifyContent="center" mb={2}>
              <Icon
                as={FiLock}
                boxSize={10}
                color="blue.500"
              />
            </Flex>
            Лимит кредитов исчерпан
          </DialogHeader>
          
          <DialogCloseTrigger />
          
          <DialogBody>
            <VStack gap={6} align="stretch">
              <Text textAlign="center" fontSize="md">
                Для создания этого контента необходимо больше кредитов, чем доступно на вашем текущем тарифе.
              </Text>
              
              <Box 
                bg="gray.50" 
                p={4} 
                borderRadius="md"
                borderLeft="4px solid"
                borderLeftColor="blue.500"
              >
                <HStack gap={3}>
                  <Icon
                    as={FiCreditCard}
                    boxSize={5}
                    color="blue.500"
                  />
                  <Box>
                    <Text fontWeight="bold">Обновите тарифный план</Text>
                    <Text fontSize="sm" color="gray.600">
                      Получите больше кредитов для создания любого контента без ограничений
                    </Text>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </DialogBody>
          
          <DialogFooter>
            <Button
              variant="outline"
              size="md"
              onClick={handleClose}
            >
              Отмена
            </Button>
            <Button 
              variant="solid"
              colorScheme="blue" 
              size="md"
              onClick={handleGoToPlans}
            >
              Перейти к тарифам
            </Button>
          </DialogFooter>
        </Box>
      </DialogContent>
    </DialogRoot>
  );
};

export default InsufficientCreditsModal; 