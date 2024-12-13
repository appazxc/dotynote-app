import { Box, BoxProps } from '@chakra-ui/react';
import { AnimatePresence, LayoutGroup } from 'motion/react';
import React from 'react';

import { NoteDot } from 'shared/components/Dots/NoteDot';
import { PostDot } from 'shared/components/Dots/PostDot';
import { NoteDotEntity } from 'shared/types/entities/NoteDotEntity';
import { PostDotEntity } from 'shared/types/entities/PostDotEntity';

type Props = ({
  placement: 'note',
  dots: NoteDotEntity[]
} | {
  placement: 'post',
  dots: PostDotEntity[]
}) & {
  showAmount?: boolean,
} & BoxProps;

export const Dots = React.memo(({ dots, showAmount, placement, ...boxProps }: Props) => {
  const items = React.useMemo(() => placement === 'note' // for type checking
    ? dots.filter((dot) => !dot._isDeleted).sort((dotA, dotB) => dotB.total - dotA.total) 
    : dots.filter((dot) => !dot._isDeleted).sort((dotA, dotB) => dotB.total - dotA.total), [placement, dots]);
  
  if (!items.length) {
    return null;
  }
  
  return (
    <LayoutGroup>
      <AnimatePresence>
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
          {items.map((dot) => {
            return placement === 'note' ? (
              <NoteDot
                key={dot.id}
                {...dot}
                showAmount={showAmount}
              />
            ) : (
              <PostDot
                key={dot.id}
                {...dot}
                showAmount={showAmount}
              />
            );
          })}
        </Box>
      </AnimatePresence>
    </LayoutGroup>
  );
});
