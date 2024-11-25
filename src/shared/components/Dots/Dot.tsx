import { Box, Text } from '@chakra-ui/react';
import { useLongPress } from '@uidotdev/usehooks';
import { motion } from 'framer-motion';
import React from 'react';

import { Tag } from 'shared/components/ui/tag';
import { NoteDotEntity } from 'shared/types/entities/NoteDotEntity';

type Props = {
  showAmount?: boolean,
  onClick: () => void,
  onLongPress: () => void,
} & Pick<NoteDotEntity, 'my' | 'text' | 'total'>;

export const Dot = React.memo((props: Props) => {
  const { text, total, my, showAmount, onClick, onLongPress } = props;
  const [longPressTriggered, setLongPressTriggered] = React.useState(false);

  const attrs = useLongPress(
    () => {
      setLongPressTriggered(true);
      onLongPress();
    },
    {
      onFinish: () => {
        setTimeout(() => setLongPressTriggered(false), 100);
      },
      threshold: 500,
    }
  );

  const handleOnClick = (event) => {
    event.stopPropagation();
    
    if (longPressTriggered) {
      return;
    }

    onClick();
  };
  
  return (
    <motion.div layout>
      <Tag
        size="lg"
        colorPalette={my > 0 ? 'blue' : my < 0 ? 'red' : 'gray'}
        bg="colorPalette.50"
        rounded="full"
        variant="subtle"
        title={text || ''}
        cursor="pointer"
        onClick={handleOnClick}
        {...attrs}
      >
        <Box display="flex" gap="1">
          {showAmount && <Text fontSize="xs" color="colorPalette.600">{total}</Text>}
          <Text>{text}</Text>
        </Box>
      </Tag>
    </motion.div>
  );
});
