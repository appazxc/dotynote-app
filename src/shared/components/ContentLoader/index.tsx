import React from 'react';

import { Spinner, Center } from '@chakra-ui/react';
import { useTimeout } from 'usehooks-ts';

type Props = {
  delay?: number,
  text?: string
}

export const ContentLoader = React.memo(({ delay = 300, text }: Props) => {
  const [visible, setVisible] = React.useState(!delay);

  const show = () => setVisible(true);

  useTimeout(show, delay);
  
  return visible ? (
    <Center w="full" h="full">
      <Spinner />
      {text}
    </Center>
  ): null;
});