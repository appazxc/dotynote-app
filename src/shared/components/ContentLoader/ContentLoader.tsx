import React from 'react';

import { Spinner, Center } from '@chakra-ui/react';

import { Wait } from 'shared/components/Wait';

type Props = {
  delay?: number,
  text?: string
}

export const ContentLoader = React.memo(({ delay = 300, text }: Props) => {
  return (
    <Wait delay={delay}>
      <Center
        w="full"
        h="full"
        background="red"
      >
        <Spinner />
        {text}
      </Center>
    </Wait>
  );
});