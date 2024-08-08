import React from 'react';

import { Box, Text, Card, CardBody, CardHeader, SimpleGrid } from '@chakra-ui/react';

type Props = {
  items: any[],
};

export const EntryMediaCards = React.memo(({ items }: Props) => {
  return (
    <Box minH="180px">
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(80px, 1fr))">
        {items.map(({ title, icon, isDisabled, onClick }) => {
          return (
            <Card
              key={title}
              padding="small"
              cursor={isDisabled ? 'default' : 'pointer'}
              opacity={isDisabled ? '0.6' : '1'}
              onClick={onClick}
            >
              <CardHeader p="2">
                {icon}
              </CardHeader>
              <CardBody
                pt="2"
                pb="1"
                px="2"
                display="flex"
                alignItems="flex-end"
              >
                <Text fontWeight="500" fontSize="sm">{title}</Text>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </Box>
  );
});
