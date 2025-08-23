import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { PiDatabase } from 'react-icons/pi';

import { Icon } from 'shared/components/ui/icon';
import { ProgressBar, ProgressRoot } from 'shared/components/ui/progress';

import type { StorageUsageSectionProps } from '../types';

import { StorageUsageItem } from './StorageUsageItem';

const storageTypeIcons = {
  videos: '🎥',
  audio: '🎵',
  images: '🖼️',
  files: '📁',
  records: '🎤',
  excalidraw: '🎨',
  notes: '📝',
};

const storageTypeLabels = {
  files: 'Files',
  videos: 'Video files',
  audio: 'Audio files', 
  images: 'Images',
  records: 'Records',
  excalidraw: 'Excalidraw',
  notes: 'Notes',
};

export const StorageUsageSection = React.memo<StorageUsageSectionProps>(({
  totalUsed,
  totalCapacity,
  breakdown,
}) => {
  const [showAllTypes, setShowAllTypes] = useState(false);
  const usagePercentage = (totalUsed / totalCapacity) * 100;
  
  const breakdownEntries = React.useMemo(() => {
    return Object.entries(breakdown).filter(([_, value]) => value > 0).sort((a, b) => b[1] - a[1]);
  }, [breakdown]);

  const visibleEntries = showAllTypes ? breakdownEntries : breakdownEntries.slice(0, 4);
  const hiddenCount = breakdownEntries.length - 4;

  return (
    <Box
      colorPalette="gray"
      p={6}
      borderRadius="2xl"
      border="3px solid"
      borderColor="border.muted"
    >
      <VStack align="flex-start" gap={6}>
        <VStack
          align="flex-start"
          gap={2}
          w="full"
        >
          <HStack justify="space-between" w="full">
            <HStack gap={3}>
              <Icon fontSize="2xl" color="gray.500">
                <PiDatabase />
              </Icon>
              <VStack align="flex-start" gap={0}>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  color="fg"
                >
                  Storage Usage
                </Text>
              </VStack>
            </HStack>
            <Text fontSize="sm" color="fg">
              {usagePercentage.toFixed(1)}% used
            </Text>
          </HStack>
          
          <Text fontSize="sm" color="fg">
            Notes, files and media take up storage space.
          </Text>
        </VStack>

        <VStack
          align="flex-start"
          gap={4}
          w="full"
        >
          <Box w="full">
            <VStack align="flex-start" gap={1}>
              <HStack justify="space-between" w="full">
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  color="colorPalette.700"
                >
                  {totalUsed.toLocaleString()}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  of {totalCapacity.toLocaleString()} limit
                </Text>
              </HStack>
              <Box w="full">
                <ProgressRoot 
                  value={usagePercentage}
                >
                  <ProgressBar />
                </ProgressRoot>
              </Box>
                
              <HStack justify="flex-end" w="full">
                <Text fontSize="xs" color="gray.500">
                  Available: {(totalCapacity - totalUsed).toLocaleString()}
                </Text>
              </HStack>
            </VStack>
          </Box>

          <VStack gap={3} w="full">
            {visibleEntries.map(([type, value]) => (
              <StorageUsageItem
                key={type}
                icon={(
                  <Text fontSize="sm">
                    {storageTypeIcons[type as keyof typeof storageTypeIcons]}
                  </Text>
                )}
                label={storageTypeLabels[type as keyof typeof storageTypeLabels]}
                value={value}
              />
            ))}
          </VStack>

          {hiddenCount > 0 && !showAllTypes && (
            <Button
              variant="ghost"
              size="sm"
              colorPalette="gray"
              onClick={() => setShowAllTypes(true)}
            >
              Show {hiddenCount} more types
            </Button>
          )}

          {showAllTypes && hiddenCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              colorPalette="gray"
              onClick={() => setShowAllTypes(false)}
            >
              Show less
            </Button>
          )}
        </VStack>
      </VStack>
    </Box>
  );
});
