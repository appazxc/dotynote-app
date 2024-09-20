import React from 'react';

import { Box, Stack, Skeleton, SkeletonText, useColorModeValue } from '@chakra-ui/react';

const PostSkeleton = () => {
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  const startColor = useColorModeValue('gray.100', 'whiteAlpha.100');
  const endColor = useColorModeValue('gray.200', 'whiteAlpha.200');

  return (
    <Box
      borderRadius="md"
      padding="6"
      borderWidth="2px"
      borderColor={borderColor}
    >
      <Skeleton
        height="15px"
        startColor={startColor}
        endColor={endColor}
      />
      <SkeletonText
        mt="4"
        noOfLines={3}
        spacing="4"
        skeletonHeight="2"
        startColor={startColor}
        endColor={endColor}
      />
    </Box>
  );
};

export const PostsSkeleton = () => {
  return (
    <Stack gap="2">
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </Stack>
  );
};
