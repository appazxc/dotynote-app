import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';

type Props = {
  size?: 'sm' | 'md';
} & FlexProps;

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
    <Flex 
      bg={creditColor}
      p="2"
      borderRadius="md"
      flexDirection="column"
      gap="2"
      {...boxProps}
    >
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
  );
});
