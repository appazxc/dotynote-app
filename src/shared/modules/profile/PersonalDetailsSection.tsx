import { Box, Heading, Link, Text, useDisclosure, useToken } from '@chakra-ui/react';
import React from 'react';

import { useColorModeValue } from 'shared/components/ui/color-mode';
import { SectionRef } from 'shared/modules/profile/PersonalDetails';

type Props = {
  title: string;
  description: {
    open?: React.ReactNode;
    close?: React.ReactNode;
  };
  children?: React.ReactNode;
  onClose?: () => void;
  ref?: React.RefCallback<SectionRef | null>;
}

export const PersonalDetailsSection = React.memo((props: Props) => {
  const { title, description, children, onClose: handleOnClose, ref } = props;

  const { open, onClose, onToggle } = useDisclosure({ 
    onClose: () => {
      handleOnClose?.();
    },
  });

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
      css={{
        '& + &': {
          borderTop: `1px solid ${borderTopColor}`,
        },
      }}
      minH="72px"
    >
      <Box flexGrow="1">
        <Heading size="md">{open ? `Edit ${title.toLocaleLowerCase()}` : title}</Heading>
        <Text
          fontSize="sm"
          color="gray"
        >
          {open ? description.open : description.close}
        </Text>
        {children && open && (
          <Box pt="4">
            {children}
          </Box>
        )}
      </Box>
      {children && (
        <Box>
          <Link
            fontWeight="600"
            fontSize="sm"
            onClick={onToggle}
          >
            {open ? 'Cancel' : 'Edit'}
          </Link>
        </Box>
      )}
    </Box>
  );
});
