import { Box, Stack, Skeleton, SkeletonText, Center, Spinner } from '@chakra-ui/react';
import React from 'react';

import { useColorModeValue } from 'shared/components/ui/color-mode';

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
    <Center h="100px">
      <Spinner />
    </Center>
  );
};
