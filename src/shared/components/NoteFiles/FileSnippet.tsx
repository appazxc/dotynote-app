import { Box, Card, HStack, IconButton, Separator, Text } from '@chakra-ui/react';
import React from 'react';
import { FaRegFileLines } from 'react-icons/fa6';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Icon } from 'shared/components/ui/icon';
import { DotsIcon } from 'shared/components/ui/icons';
import { ProgressBar, ProgressRoot } from 'shared/components/ui/progress';

type Props = {
  name: string,
  extension: string,
  size: string,
  progress?: number | null,
  options?: { label: string, onClick: () => void }[],
};

export const FileSnippet = React.memo((props: Props) => {
  const { name, extension, size, progress, options } = props;

  return (
    <Card.Root position="relative" pr="2">
      <Card.Body
        display="flex"
        flexDirection="row"
        gap="3"
        p="4"
      >
        <Box
          p="3"
          borderRadius="md"
          bg="gray.100"
          flexShrink="0"
          display="flex"
          alignItems="center"
        >
          <Icon color="gray.600">
            <FaRegFileLines size="18px" />
          </Icon>
        </Box>
        <Box>
          <Text
            display="block"
            fontWeight="500"
            lineClamp={1}
            title={name}
          >
            {name}
          </Text>
          <HStack gap="2">
            <Text fontSize="sm">{size}</Text>
            <Separator orientation="vertical" height="4" />
            <Text fontSize="sm">{extension}</Text>
          </HStack>
        </Box>
      </Card.Body>
      {progress && (
        <ProgressRoot value={progress}>
          <ProgressBar />
        </ProgressRoot>
      )}
      {options && (
        <Menu placement="bottom-end">
          <MenuTrigger>
            <IconButton
              size="sm"
              aria-label=""
              variant="plain"
              display="inline-flex"
              iconSize="auto"
              position="absolute"
              top="0"
              right="0"
            >
              <DotsIcon size="18" />
            </IconButton> 
          </MenuTrigger>
          <MenuList>
            {options.map((option) => (
              <MenuItem
                key={option.label}
                label={option.label}
                onClick={option.onClick}
              />
            ))}
          </MenuList>
        </Menu>
      )}
    </Card.Root>
  );
});
