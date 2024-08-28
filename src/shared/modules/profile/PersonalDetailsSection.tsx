import React from 'react';

import { Button, useDisclosure, useToken } from '@chakra-ui/react';
import { Box, Heading, Text } from '@chakra-ui/react';

type Props = {
  title: string,
  description: {
    open?: React.ReactNode,
    close?: React.ReactNode,
  },
  children?: React.ReactNode,
};

export const PersonalDetailsSection = React.memo((props: Props) => {
  const { title, description, children } = props;

  const { isOpen, getButtonProps, getDisclosureProps } = useDisclosure();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  const borderColor = useToken('colors', 'gray.100');

  return (
    <Box
      justifyContent="space-between"
      display="flex"
      gap="2"
      py="4"
      sx={{
        '& + &': {
          borderTop: `1px solid ${borderColor}`,
        },
      }}
    >
      <Box flexGrow="1">
        <Heading size="sm">{isOpen ? `Edit ${title.toLocaleLowerCase()}` : title}</Heading>
        <Text
          fontSize="sm"
          color="gray"
        >
          {isOpen ? description.open : description.close}
        </Text>
        {children && (
          <Box {...disclosureProps} pt="4">
            {children}
          </Box>
        )}
      </Box>
      {children && (
        <Box>
          <Button
            {...buttonProps}
            variant="link"
            colorScheme="brand"
            size="sm"
          >
            {isOpen ? 'Cancel' : 'Edit'}
          </Button>
        </Box>
      )}
    </Box>
  );
});
