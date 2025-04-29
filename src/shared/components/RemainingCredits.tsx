import { Box, Text, Flex, BoxProps } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';

type Props = BoxProps;

export const RemainingCredits = React.memo((props: Props) => {
  const { remainingCredits, isCreditsLimitReached } = useUserBalanceInfo();
  const navigate = useNavigate();

  if (remainingCredits >= 500) {
    return null;
  }

  const handleUpgradePlan = () => {
    navigate({ to: '/app/billing' });
  };

  const creditColor = isCreditsLimitReached ? 'red.500' : 'orange.400';
  const text = isCreditsLimitReached ? 'Credits limit reached' : `Remaining credits: ${remainingCredits}`;

  return (
    <Box 
      bg={creditColor}
      p="2"
      borderRadius="md"
      {...props}
    >
      <Flex direction="column" gap="2">
        <Text
          fontWeight="bold"
          fontSize="xs"
          color="white"
        >
          {text}
        </Text>
        <Button 
          size="2xs"
          onClick={handleUpgradePlan}
        >
            Upgrade plan
        </Button>
      </Flex>
    </Box>
  );
});
