import { Center, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  width: number;
  height: number;
};

export const ImageError = React.memo(({ width, height }: Props) => {
  return (
    <Center
      width={width}
      height={height}
      bg="gray.200"
      borderRadius={6}
    >
      <Text color="fg.muted">Error loading image</Text>
    </Center>
  );
});
