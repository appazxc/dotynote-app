import { Box, IconButton } from '@chakra-ui/react';
import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router';
import { useTabContext } from 'shared/modules/space/components/TabProvider';

type Props = {
  left?: React.ReactNode,
  children?: React.ReactNode,
  right?: React.ReactNode,
  showBackButton?: React.ReactNode,
}

export const TabHeader = ({ children, left, right, showBackButton = true }: Props) => {
  const navigate = useNavigate();
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
        onClick={() => navigate(-1)}
        variant="ghost"
        colorScheme="whatsapp"
      />
    );
  }, [tab.routes.length, navigate, showBackButton]);

  return (
    <Box
      w="full"
      display="flex"
      flexDirection="row"
      alignItems="center"
    >
      <Box flexShrink="0">{renderedBackButton}{left}</Box>
      <Box flexGrow="1">{children}</Box>
      <Box flexShrink="0">{right}</Box>
    </Box>
  );
};
