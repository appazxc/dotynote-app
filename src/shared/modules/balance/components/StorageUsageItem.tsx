import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

import type { StorageUsageItemProps } from '../types';

export const StorageUsageItem = React.memo<StorageUsageItemProps>(({
  icon,
  label,
  value,
}) => {
  return (
    <HStack
      justify="space-between"
      w="full"
      bg="bg.subtle"
      borderRadius="md"
      p={2}
    >
      <HStack gap={3}>
        {icon}
        <Text
          fontSize="sm"
          color="fg"
        >
          {label}
        </Text>
      </HStack>
      <Text
        fontSize="sm"
        fontWeight="medium"
        color="fg"
      >
        {value.toLocaleString()}
      </Text>
    </HStack>
  );
});

StorageUsageItem.displayName = 'StorageUsageItem';
