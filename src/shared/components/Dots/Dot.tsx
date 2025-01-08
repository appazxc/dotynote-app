import { Box, Text } from '@chakra-ui/react';
import { motion } from 'motion/react';
import React from 'react';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Tag } from 'shared/components/ui/tag';
import { NoteDotEntity } from 'shared/types/entities/NoteDotEntity';

type Props = {
  showAmount?: boolean,
  onPlus: () => void,
  onMinus: () => void,
} & Pick<NoteDotEntity, 'my' | 'text' | 'total'>;

export const Dot = React.memo((props: Props) => {
  const { text, total, my, showAmount, onPlus, onMinus } = props;

  const handleOnClick = (event) => {
    event.stopPropagation();

    if (my) {
      onMinus();
    } else {
      onPlus();
    }
  };
  
  return (
    <motion.div layout>
      <Menu isContextMenu>
        <MenuTrigger>
          <Tag
            size="lg"
            colorPalette={my > 0 ? 'blue' : my < 0 ? 'red' : 'gray'}
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
        </MenuTrigger>
        <MenuList>
          <MenuItem label="Remove" onClick={onMinus} />
        </MenuList>
      </Menu>
    </motion.div>
  );
});
