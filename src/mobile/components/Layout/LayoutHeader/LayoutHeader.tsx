import React from 'react';

import { Box, BoxProps, IconButton } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';

type Props = {
  left?: React.ReactNode,
  children?: React.ReactNode,
  right?: React.ReactNode,
  showBackButton?: React.ReactNode,
} & Omit<BoxProps, 'children' | 'left' | 'right'>

export const LayoutHeader = ({ children, left, right, showBackButton, ...restProps }: Props) => {
  const { history } = useRouter();
  
  const renderedBackButton = React.useMemo(() => {
    if (!showBackButton) {
      return null;
    }

    return (
      <IconButton
        size="sm"
        aria-label="Note back"
        icon={<BsArrowLeft />}
        onClick={() => history.back()}
        variant="ghost"
        colorScheme="brand"
      />
    );
  }, [history, showBackButton]);

  return (
    <Box
      w="full"
      display="flex"
      flexDirection="row"
      alignItems="center"
      background="body"
      {...restProps}
    >
      <Box flexShrink="0">{renderedBackButton}{left}</Box>
      <Box flexGrow="1">{children}</Box>
      <Box flexShrink="0">{right}</Box>
    </Box>
  );
};
