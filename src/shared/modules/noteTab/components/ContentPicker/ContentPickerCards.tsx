import { Box, Button, Card, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppSelector } from 'shared/store/hooks';

type Props = {
  view?: 'grid' | 'list';
  items: any[];
};

const ICON_SIZE = 24;

export const ContentPickerCards = React.memo(({ items, view = 'grid' }: Props) => {
  const isMobile = useAppSelector(selectIsMobile);
  
  if (view === 'grid') {
    return (
      <Box minH="180px">
        <SimpleGrid gap={4} templateColumns="repeat(auto-fill, minmax(80px, 1fr))">
          {items.map(({ title, icon: Icon, disabled, onClick }) => {
            return (
              <Card.Root
                key={title}
                cursor={disabled ? 'default' : 'pointer'}
                opacity={disabled ? '0.6' : '1'}
                onClick={onClick}
              >
                <Card.Header p="2">
                  <Icon size={ICON_SIZE} />
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
  }

  return (
    <Stack gap={1}>
      {items.map(({ title, icon: Icon, disabled, onClick }) => {
        return (
          <Button
            key={title}
            gap={2}
            size="sm"
            variant="plain"
            justifyContent="flex-start"
            disabled={disabled}
            pl="0"
            onClick={onClick}
          >
            <Icon size="14px" />
            <Text
              as="span"
              fontSize="sm"
              fontWeight="400"
            >{title}</Text>
          </Button>
        );
      })}
    </Stack>
  );
});
