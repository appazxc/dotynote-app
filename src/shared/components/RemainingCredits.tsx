import { Box, Text, Flex, BoxProps } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';

type Props = {
  size?: 'sm' | 'md';
} & BoxProps;

export const RemainingCredits = React.memo(({ size = 'sm', ...boxProps }: Props) => {
  const { remainingCredits, isCreditsLimitReached } = useUserBalanceInfo();
  const navigate = useNavigate();

  if (remainingCredits >= 500) {
    return null;
  }

  const handleUpgradePlan = () => {
    navigate({ to: '/app/billing' });
  };

  const text = isCreditsLimitReached ? 'Credits limit reached' : `Remaining credits: ${remainingCredits}`;
  const textColor = isCreditsLimitReached ? 'red.fg' : 'yellow.fg';
  const creditColor = isCreditsLimitReached ? 'red.subtle' : 'yellow.subtle';
  const buttonSize = size === 'sm' ? '2xs' : 'xs';
  const buttonColorPalette = isCreditsLimitReached ? 'red' : 'yellow';

  return (
    <Box 
      bg={creditColor}
      p="2"
      borderRadius="md"
      {...boxProps}
    >
      <Flex direction="column" gap="2">
        <Text
          fontWeight="bold"
          fontSize="xs"
          color={textColor}
        >
          {text}
        </Text>
        <Button 
          size={buttonSize}
          colorPalette={buttonColorPalette}
          onClick={handleUpgradePlan}
        >
          Upgrade plan
        </Button>
      </Flex>
    </Box>
  );
});
