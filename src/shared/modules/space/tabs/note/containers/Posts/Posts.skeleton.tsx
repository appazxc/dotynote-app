import React from 'react';

import { Box, Stack, Skeleton, SkeletonText } from '@chakra-ui/react';

const PostSkeleton = () => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
      opacity="0.3"
    >
      <Skeleton height="20px" />
      <SkeletonText
        mt="4"
        noOfLines={4}
        spacing="4"
        skeletonHeight="2"
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
