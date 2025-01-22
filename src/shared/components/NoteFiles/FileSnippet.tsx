import { Box, Card, HStack, IconButton, Separator, Text } from '@chakra-ui/react';
import isNumber from 'lodash/isNumber';
import React from 'react';
import { FaRegFileLines } from 'react-icons/fa6';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Icon } from 'shared/components/ui/icon';
import { DotsIcon } from 'shared/components/ui/icons';
import { ProgressBar, ProgressRoot } from 'shared/components/ui/progress';

type Props = {
  name: string,
  extension: string,
  fileSize: string,
  size?: 'sm' | 'md',
  progress?: number | null,
  isDisabled?: boolean,
  options?: { label: string, onClick: () => void }[],
};

const sizes = {
  md: {
    bodyPadding: '4',
    titleFontSize: 'md',
    infoFontSize: 'sm',
    iconSize: 'sm' as const,
  },
  sm: {
    bodyPadding: '2',
    titleFontSize: 'sm',
    infoFontSize: 'xs',
    iconSize: 'xs' as const,
  },
};

export const FileSnippet = React.memo((props: Props) => {
  const { name, extension, fileSize, size = 'md', isDisabled, progress, options } = props;

  const snippetProps = sizes[size];

  return (
    <Card.Root position="relative">
      <Card.Body
        display="flex"
        flexDirection="row"
        gap="3"
        p={snippetProps.bodyPadding}
        pr="6"
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
        <Box overflow="hidden">
          <Text
            display="block"
            fontWeight="500"
            lineClamp={1}
            fontSize={snippetProps.titleFontSize}
            title={name}
          >
            {name}
          </Text>
          <HStack gap="2">
            <Text fontSize={snippetProps.infoFontSize}>{fileSize}</Text>
            <Separator orientation="vertical" height="4" />
            <Text fontSize={snippetProps.infoFontSize}>{extension}</Text>
          </HStack>
        </Box>
      </Card.Body>
      {isNumber(progress) && (
        <ProgressRoot value={null} size="xs">
          <ProgressBar />
        </ProgressRoot>
      )}
      {options && (
        <Menu placement="bottom-end" enabled={!isDisabled}>
          <MenuTrigger>
            <IconButton
              size={snippetProps.iconSize}
              aria-label=""
              variant="plain"
              display="inline-flex"
              iconSize="auto"
              position="absolute"
              top="0"
              right="0"
            >
              <DotsIcon />
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
