import { Box, BoxProps, Text, IconButton } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import React from 'react';

import { ArrowLeftIcon } from 'shared/components/ui/icons';

import { LayoutHeader } from 'desktop/components/LayoutHeader';

type Props = {
  title?: React.ReactNode;
  showBackButton?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
} & Omit<BoxProps, 'children' | 'left' | 'right'>

export const DefaultLayoutHeader = ({ title, right, showBackButton, left, children, ...boxProps }: Props) => {
  const { history } = useRouter();

  return (
    <LayoutHeader
      position="sticky"
      p="2"
      px="4"
      left={left || (
        <Box
          display="flex"
          alignItems="center"
          gap="3"
        >
          {showBackButton && (
            <IconButton 
              aria-label="Back"
              size="xs"
              variant="ghost"
              iconSize="auto"
              onClick={() => {
                history.back();
              }}
            >
              <ArrowLeftIcon size="20px" />
            </IconButton>
          )}
          {title && <Text fontSize="md" fontWeight="500">{title}</Text>}
        </Box>
      )}
      right={right}
      {...boxProps}
    >
      {children}
    </LayoutHeader>
  );
};
