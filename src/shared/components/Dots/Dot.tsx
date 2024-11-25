import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import { Tag } from 'shared/components/ui/tag';
import { NoteDotEntity } from 'shared/types/entities/NoteDotEntity';

type Props = {
  showAmount?: boolean,
  onClick: () => void,
} & Pick<NoteDotEntity, 'my' | 'text' | 'total'>;

export const Dot = React.memo((props: Props) => {
  const { text, total, my, showAmount, onClick } = props;

  const handleOnClick = (event) => {
    event.stopPropagation();
    
    onClick();
  };
  
  return (
    <motion.div layout>
      <Tag
        size="lg"
        colorPalette={my > 0 ? 'blue' : 'gray'}
        bg="colorPalette.50"
        rounded="full"
        variant="subtle"
        title={text || ''}
        cursor="pointer"
        onClick={handleOnClick}
      >
        <Box display="flex" gap="1">
          {showAmount && <Text fontSize="xs" color="colorPalette.600">{total}</Text>}
          <Text>{text}</Text>
        </Box>
      </Tag>
    </motion.div>
  );
});
