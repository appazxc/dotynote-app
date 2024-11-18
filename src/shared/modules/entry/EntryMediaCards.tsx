import { Box, Card, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';

type Props = {
  items: any[],
};

export const EntryMediaCards = React.memo(({ items }: Props) => {
  return (
    <Box minH="180px">
      <SimpleGrid gap={4} templateColumns="repeat(auto-fill, minmax(80px, 1fr))">
        {items.map(({ title, icon, isDisabled, onClick }) => {
          return (
            <Card.Root
              key={title}
              padding="small"
              cursor={isDisabled ? 'default' : 'pointer'}
              opacity={isDisabled ? '0.6' : '1'}
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
                <Text fontWeight="500" fontSize="sm">{title}</Text>
              </Card.Body>
            </Card.Root>
          );
        })}
      </SimpleGrid>
    </Box>
  );
});
