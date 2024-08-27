import React from 'react';

import { Box, BoxProps, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';

type Props = {
  title?: React.ReactNode,
  left?: React.ReactNode,
  children?: React.ReactNode,
  right?: React.ReactNode,
  showBackButton?: React.ReactNode,
} & Omit<BoxProps, 'children' | 'left' | 'right'>

export const LayoutHeader = (props: Props) => {
  const { history } = useRouter();
  const { 
    children, 
    left, 
    right, 
    showBackButton, 
    title,
    ...restProps
  } = props;
  
  const renderedBackButton = React.useMemo(() => {
    if (!showBackButton) {
      return null;
    }

    return (
      <IconButton
        size="md"
        aria-label="Note back"
        icon={<BsArrowLeft size="18" />}
        onClick={() => history.back()}
        variant="unstyled"
        display="inline-flex"
      />
    );
  }, [history, showBackButton]);

  const renderedTitle = React.useMemo(() => {
    if (!title) {
      return null;
    }

    return <Text fontWeight="500">{title}</Text>;
  }, [title]);

  return (
    <Box
      w="full"
      display="flex"
      flexDirection="row"
      alignItems="center"
      background="body"
      pl={renderedBackButton ? '2' : '4'}
      pr={right ? '2' : '4'}
      minH="44px"
      gap="2"
      {...restProps}
    >
      <Box flexShrink="0">{renderedBackButton}{left}</Box>
      <Box flexGrow="1">{renderedTitle || children}</Box>
      <Box flexShrink="0">{right}</Box>
    </Box>
  );
};
