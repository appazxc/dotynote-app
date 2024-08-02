import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { useRouter } from '@tanstack/react-router';
import { BsArrowLeft } from 'react-icons/bs';

import { useTabContext } from 'shared/modules/space/components/TabProvider';

type Props = {
  left?: React.ReactNode,
  children?: React.ReactNode,
  right?: React.ReactNode,
  showBackButton?: React.ReactNode,
}

export const TabHeader = ({ children, left, right, showBackButton }: Props) => {
  const { history } = useRouter();
  const tab = useTabContext();

  const renderedBackButton = React.useMemo(() => {
    if (tab.routes.length <= 1 || !showBackButton) {
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
  }, [tab.routes.length, history, showBackButton]);

  return (
    <Box
      w="full"
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Box
        flexShrink="0"
        alignItems="center"
        display="flex"
      >
        {renderedBackButton}{left}
      </Box>
      <Box flexGrow="1">{children}</Box>
      <Box flexShrink="0">{right}</Box>
    </Box>
  );
};
