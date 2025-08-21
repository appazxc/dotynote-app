import { Flex, FlexProps, Text } from '@chakra-ui/react';
import { useNavigate } from '@tanstack/react-router';
import React from 'react';

import { Button } from 'shared/components/ui/button';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';

type Props = {
  size?: 'sm' | 'md';
} & FlexProps;

export const RemainingCredits = React.memo(({ size = 'sm', ...boxProps }: Props) => {
  const { isCreditsAlmostFinished, isStorageLimitReached } = useUserBalanceInfo();
  const navigate = useNavigate();

  if (!isCreditsAlmostFinished && !isStorageLimitReached) {
    return null;
  }

  const handleUpgradePlan = () => {
    navigate({ to: '/app/billing' });
  };

  const text = isStorageLimitReached 
    ? 'Storage limit reached' 
    : isCreditsAlmostFinished ? 'Credits almost finished' : null;
  const textColor = isStorageLimitReached ? 'red.fg' : 'yellow.fg';
  const creditColor = isStorageLimitReached ? 'red.subtle' : 'yellow.subtle';
  const buttonSize = size === 'sm' ? '2xs' : 'xs';
  const buttonColorPalette = isStorageLimitReached ? 'red' : 'yellow';

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
        {isStorageLimitReached ? 'Upgrade plan' : 'Buy credits'}
      </Button>
    </Flex>
  );
});
