import { Box, Card, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';

import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppSelector } from 'shared/store/hooks';

type Props = {
  items: any[],
};

export const ContentPickerCards = React.memo(({ items }: Props) => {
  const isMobile = useAppSelector(selectIsMobile);
  
  return (
    <Box minH="180px">
      <SimpleGrid gap={4} templateColumns="repeat(auto-fill, minmax(80px, 1fr))">
        {items.map(({ title, icon, disabled, onClick }) => {
          return (
            <Card.Root
              key={title}
              padding="small"
              cursor={disabled ? 'default' : 'pointer'}
              opacity={disabled ? '0.6' : '1'}
              onClick={onClick}
            >
              <Card.Header p="2">
                {icon}
              </Card.Header>
              <Card.Body
                pt="2"
                pb="1"
                px="2"
                display="flex"
                alignItems="flex-end"
              >
                <Text fontWeight="500" fontSize={isMobile ? 'xs' : 'sm'}>{title}</Text>
              </Card.Body>
            </Card.Root>
          );
        })}
      </SimpleGrid>
    </Box>
  );
});
