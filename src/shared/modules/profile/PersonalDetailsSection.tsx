import React from 'react';

import { Button, useColorModeValue, useDisclosure, useToken } from '@chakra-ui/react';
import { Box, Heading, Text } from '@chakra-ui/react';

type Props = {
  title: string,
  description: {
    open?: React.ReactNode,
    close?: React.ReactNode,
  },
  children?: React.ReactNode,
  onClose?: () => void,
};

export const PersonalDetailsSection = React.memo(React.forwardRef((props: Props, ref) => {
  const { title, description, children, onClose: handleOnClose } = props;

  const { isOpen, getButtonProps, onClose, getDisclosureProps } = useDisclosure({ 
    onClose: () => {
      handleOnClose?.();
    }, 
  });
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();

  const borderColor = useToken('colors', 'gray.100');
  const borderColorDark = useToken('colors', 'brand.400');
  const borderTopColor = useColorModeValue(borderColor, borderColorDark);

  React.useImperativeHandle(ref, () => {
    return {
      close() {
        onClose();
      },
    };
  }, [onClose]);

  return (
    <Box
      justifyContent="space-between"
      display="flex"
      gap="2"
      py="4"
      sx={{
        '& + &': {
          borderTop: `1px solid ${borderTopColor}`,
        },
      }}
      minH="72px"
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
}));
