import { Box, Button, Card, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppSelector } from 'shared/store/hooks';

type Props = {
  view?: 'grid' | 'list' | 'row';
  items: {
    title: string;
    icon: React.ElementType;
    isDisabled?: boolean;
    onClick: () => void;
  }[];
};

const ICON_SIZE = 24;

export const ContentPickerCards = React.memo(({ items, view = 'grid' }: Props) => {
  const isMobile = useAppSelector(selectIsMobile);
  
  if (view === 'grid') {
    return (
      <Box minH="180px">
        <SimpleGrid gap={4} templateColumns="repeat(auto-fill, minmax(80px, 1fr))">
          {items.map(({ title, icon: Icon, isDisabled, onClick }) => {
            return (
              <Card.Root
                key={title}
                cursor={isDisabled ? 'default' : 'pointer'}
                opacity={isDisabled ? '0.6' : '1'}
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

  if (view === 'row') {
    return (
      <Stack
        gap={2}
        flexDirection="row"
        py="2"
      >
        {items.map(({ title, icon: Icon, onClick }) => {
          return (
            <Box
              key={title}
              gap={2}
              justifyContent="flex-start"
              flexDirection="column"
              alignItems="center"
              display="flex"
              p="1"
              onClick={onClick}
            >
              <Box
                boxSize="34px"
                bg="gray.subtle"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                <Icon size="16px" />
              </Box>
              <Text
                as="span"
                fontSize="xs"
                fontWeight="500"
                textAlign="center"
              >
                {title}
              </Text>
            </Box>
          );
        })}
      </Stack>
    );
  }

  return (
    <Stack gap={0}>
      {items.map(({ title, icon: Icon, isDisabled, onClick }) => {
        return (
          <Button
            key={title}
            gap={2}
            size="sm"
            variant="plain"
            justifyContent="flex-start"
            disabled={isDisabled}
            pl="0"
            iconSize="auto"
            onClick={onClick}
          >
            <Box
              boxSize="28px"
              bg="gray.subtle"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
            >
              <Icon size="16px" />
            </Box>
            <Text
              as="span"
              fontSize="sm"
              fontWeight="400"
            >
              {title}
            </Text>
          </Button>
        );
      })}
    </Stack>
  );
});
