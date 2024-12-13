import { BoxProps } from '@chakra-ui/react';
import React from 'react';

import { DotsWrapper } from 'shared/components/Dots/DotsWrapper';
import { NoteDot } from 'shared/modules/noteTab/components/NoteContent/NoteDot';
import { NoteDotEntity } from 'shared/types/entities/NoteDotEntity';

type Props = {
  dots: NoteDotEntity[]
  showAmount?: boolean,
} & BoxProps;

export const NoteContentDots = React.memo(({ dots, showAmount, ...boxProps }: Props) => {
  const items = React.useMemo(() => 
    dots.filter((dot) => !dot._isDeleted).sort((dotA, dotB) => dotB.total - dotA.total), [dots]);
  
  if (!items.length) {
    return null;
  }
  
  return (
    <DotsWrapper {...boxProps}>
      {items.map((dot) => {
        return (
          <NoteDot
            key={dot.id}
            {...dot}
            showAmount={showAmount}
          />
        );
      })}
    </DotsWrapper>
  );
});
