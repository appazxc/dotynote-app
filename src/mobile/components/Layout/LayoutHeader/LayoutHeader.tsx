import { Box, BoxProps, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';

type Props = {
  title?: React.ReactNode,
  left?: React.ReactNode,
  children?: React.ReactNode,
  right?: React.ReactNode,
  showBackButton?: React.ReactNode,
  onBackButtonClick?: () => void,
} & Omit<BoxProps, 'children' | 'left' | 'right'>

export const LayoutHeader = (props: Props) => {
  const { history } = useRouter();
  const { 
    children, 
    left, 
    right, 
    showBackButton, 
    title,
    onBackButtonClick,
    ...restProps
  } = props;
  
  const renderedBackButton = React.useMemo(() => {
    if (!showBackButton) {
      return null;
    }

    return (
      <IconButton
        size="sm"
        aria-label="Note back"
        variant="plain"
        display="inline-flex"
        iconSize="auto"
        onClick={onBackButtonClick || (() => history.back())}
      >
        <BsArrowLeft size="18" />
      </IconButton>
    );
  }, [history, showBackButton, onBackButtonClick]);

  const renderedTitle = React.useMemo(() => {
    if (!title) {
      return null;
    }

    return (
      <Text
        fontWeight="500"
        lineClamp={1}
        overflow="hidden" 
        textOverflow="ellipsis"
        lineHeight="1.2"
      >
        {title}
      </Text>
    );
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
      {(renderedBackButton || left) && <Box flexShrink="0">{renderedBackButton}{left}</Box>}
      <Box flexGrow="1">{renderedTitle || children}</Box>
      {right && <Box flexShrink="0">{right}</Box>}
    </Box>
  );
};
