import { Box, BoxProps, Stack, Text } from '@chakra-ui/react';
import React from 'react';

import { Tag } from 'shared/components/ui/tag';
import { NoteDotEntity } from 'shared/types/entities/NoteDotEntity';
import { PostDotEntity } from 'shared/types/entities/PostDotEntity';

type Props = {
  showAmount?: boolean,
  dots: NoteDotEntity[] | PostDotEntity[]
} & BoxProps;

export const Dots = React.memo(({ dots, showAmount, ...boxProps }: Props) => {
  if (!dots.length) {
    return null;
  }
  
  return (
    <Box
      flexDirection="row"
      gap="2"
      display="flex"
      flexWrap="wrap"
      onContextMenu={(e) => {
        e.stopPropagation();
      }}
      {...boxProps}
    >
      {dots.map((dot) => {
        const {
          id,
          text,
          total,
          my,
        } = dot;

        return (
          <Tag
            key={id}
            size="lg"
            colorPalette={my !== 0 ? 'blue' : 'gray'}
            bg="colorPalette.50"
            rounded="full"
            variant="subtle"
            title={text || ''}
          >
            <Box display="flex" gap="1">
              {showAmount && <Text fontSize="xs" color="colorPalette.600">{total}</Text>}
              <Text>{text}</Text>
            </Box>
          </Tag>
        );
      })}
    </Box>
  );
});
