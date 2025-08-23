import { Box, Grid, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { api } from 'shared/api';
import { STORAGE_ITEM_TYPES } from 'shared/constants/storage';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';
import { useUserSubscription } from 'shared/hooks/useUserSubscription';
import { UserStorageEntity } from 'shared/types/entities/UserStorageEntity';
import { getItemStorageUsage } from 'shared/util/getItemStorageUsage';

import { BalanceCard } from './components/BalanceCard';
import { StorageUsageSection } from './components/StorageUsageSection';

export const BalanceContent = React.memo(() => {
  const balanceInfo = useUserBalanceInfo();
  const { data: storage } = useQuery({
    queryKey: ['userStorage'],
    queryFn: () => {
      return api.get<UserStorageEntity>('/users/storage');
    },
  });

  const subscription = useUserSubscription();

  const breakdown = React.useMemo(() => {
    if (!storage) {
      return null;
    }

    return {
      files: getItemStorageUsage(STORAGE_ITEM_TYPES.FILE, storage.fileSize),
      videos: getItemStorageUsage(STORAGE_ITEM_TYPES.VIDEO, storage.videoSize),
      audio: getItemStorageUsage(STORAGE_ITEM_TYPES.AUDIO, storage.audioSize),
      images: getItemStorageUsage(STORAGE_ITEM_TYPES.IMAGE, storage.imageCount),
      records: getItemStorageUsage(STORAGE_ITEM_TYPES.RECORD, storage.recordSize),
      excalidraw: getItemStorageUsage(STORAGE_ITEM_TYPES.EXCALIDRAW, storage.excalidrawSize),
      notes: getItemStorageUsage(STORAGE_ITEM_TYPES.NOTE, storage.noteCount),
    };
  }, [storage]);

  if (!breakdown || !subscription) {
    return null;
  }

  return (
    <Box>
      <VStack gap={8} align="stretch">
        <Grid
          templateColumns={{ base: '1fr', md: '1fr 1fr' }}
          gap={4}
        >
          <BalanceCard
            type="credits"
            current={balanceInfo.credits}
            nextAllocation={subscription?.nextAllocationAt}
            allocationAmount={subscription.plan?.credits}
            subtitle="For notes & files"
          />
              
          <BalanceCard
            type="doty"
            current={balanceInfo.doty}
            nextAllocation={subscription?.nextAllocationAt}
            allocationAmount={subscription.plan?.doty}
            subtitle="For features"
          />
        </Grid>

        <StorageUsageSection
          totalUsed={balanceInfo.storageUsage}
          totalCapacity={balanceInfo.storageCapacity}
          breakdown={breakdown}
        />
      </VStack>
    </Box>
  );
});

BalanceContent.displayName = 'BalanceContent';
