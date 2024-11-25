import React from 'react';

import { useUpdateNoteDot } from 'shared/api/hooks/useUpdateNoteDot';
import { Dot } from 'shared/components/Dots/Dot';
import { NoteDotEntity } from 'shared/types/entities/NoteDotEntity';

type Props = {
  showAmount?: boolean
} & NoteDotEntity;

export const NoteDot = React.memo((props: Props) => {
  const { id, text, total, my, showAmount } = props;
  const { mutate, isPending } = useUpdateNoteDot();

  const handleOnClick = () => {
    if (isPending) {
      return;
    }
    
    mutate({
      dotId: id,
      action: 'click',
    });
  };
  
  return (
    <Dot
      text={text}
      total={total}
      my={my}
      showAmount={showAmount}
      onClick={handleOnClick}
    />
  );
});
