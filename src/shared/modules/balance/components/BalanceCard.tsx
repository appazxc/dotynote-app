import { Box, Text, HStack, VStack, BoxProps, Badge } from '@chakra-ui/react';
import React from 'react';
import { PiCoinVerticalDuotone } from 'react-icons/pi';

import { Icon } from 'shared/components/ui/icon';
import { formatNumber } from 'shared/modules/balance/utils';
import { formatNextAllocationTime } from 'shared/util/formatNextAllocationTime';

type BalanceCardProps = {
  type: 'credits' | 'doty';
  current: number;
  nextAllocation: string | null;
  allocationAmount?: number;
  subtitle: string;
}

const balanceColors: Record<BalanceCardProps['type'], {
  primary: BoxProps['color'];
  background: BoxProps['color'];
  text: BoxProps['color'];
  border: BoxProps['color'];
}> = {
  credits: {
    primary: 'green.500',
    background: 'green.50',
    text: 'green.900',
    border: 'green.200',
  },
  doty: {
    primary: 'orange.500',
    background: 'orange.50',
    text: 'orange.900',
    border: 'orange.200',
  },
};

export const BalanceCard = React.memo<BalanceCardProps>(({
  type,
  current,
  nextAllocation,
  allocationAmount = 0,
  subtitle,
}) => {
  const colors = balanceColors[type];
  const icon = type === 'credits' ? <PiCoinVerticalDuotone /> : <PiCoinVerticalDuotone />;
  const label = type === 'credits' ? 'Credits' : 'Doty';
  const colorPalette = type === 'credits' ? 'green' : 'orange';

  return (
    <Box
      bg={colors.background}
      colorPalette={colorPalette}
      p={6}
      borderRadius="2xl"
      border="3px solid"
      borderColor="colorPalette.subtle"
    >
      <VStack align="flex-start" gap={4}>
        <HStack gap={3}>
          <Icon fontSize="3xl" color="colorPalette.500">{icon}</Icon>
          <VStack align="flex-start" gap={0}>
            <Text
              fontSize="sm"
              fontWeight="medium"
              color="fg"
            >
              {label}
            </Text>
            <Badge colorPalette={colorPalette} borderRadius="full">
              {subtitle}
            </Badge>
          </VStack>
        </HStack>

        <VStack align="flex-start" gap={1}>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color="colorPalette.600"
          >
            {formatNumber(current)}
          </Text>

          <Text
            fontSize="xs"
            color="gray.500"
          >
            Next allocation: {formatNextAllocationTime(nextAllocation)} (+{formatNumber(allocationAmount)})
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
});

BalanceCard.displayName = 'BalanceCard';
