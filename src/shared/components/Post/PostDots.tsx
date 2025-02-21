import { BoxProps } from '@chakra-ui/react';
import React from 'react';

import { DotsWrapper } from 'shared/components/Dots/DotsWrapper';
import { PostDot } from 'shared/components/Post/PostDot';
import { PostDotEntity } from 'shared/types/entities/PostDotEntity';

type Props = {
  dots: PostDotEntity[];
  showAmount?: boolean;
} & BoxProps;

export const PostDots = React.memo(({ dots, showAmount, ...boxProps }: Props) => {
  const items = React.useMemo(() =>
    dots.filter((dot) => !dot._isDeleted).sort((dotA, dotB) => dotB.total - dotA.total), [dots]);
  
  if (!items.length) {
    return null;
  }
  
  return (
    <DotsWrapper {...boxProps}>
      {items.map((dot) => {
        return (
          <PostDot
            key={dot.id}
            {...dot}
            showAmount={showAmount}
          />
        );
      })}
    </DotsWrapper>
  );
});
