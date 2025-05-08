import { Box, Stack, Flex, Container } from '@chakra-ui/react';
import { Skeleton, SkeletonText } from '@chakra-ui/react';
import React from 'react';

import { Wait } from 'shared/components/Wait';

type Props = Record<string, never>;

export const NotePending = React.memo((_props: Props) => {
  return (
    <Wait delay={350}>
      <Container
        p={4}
        pt="16"
        maxW="3xl"
      >
        <Stack gap={6} width="full">
          {/* Note title skeleton */}
          <Skeleton height="40px" width="70%" />
        
          {/* Note main text skeleton */}
          <SkeletonText noOfLines={6} gap={2} />
        
          {/* Image skeleton */}
          <Box>
            <Skeleton
              height="150px"
              width="full"
              borderRadius="md"
            />
          </Box>
        
          {/* Video skeleton */}
          <Box>
            <Skeleton
              height="150px"
              width="full"
              borderRadius="md"
            />
          </Box>
        
          {/* Tags skeleton */}
          <Flex gap={2} flexWrap="wrap">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                height="24px"
                width={`${40 + Math.random() * 40}px`}
                borderRadius="full"
              />
            ))}
          </Flex>
        </Stack>
      </Container>
    </Wait>
  );
});
