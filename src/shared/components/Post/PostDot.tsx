import React from 'react';

import { useUpdatePostDot } from 'shared/api/hooks/useUpdatePostDot';
import { Dot } from 'shared/components/Dots/Dot';
import { PostDotEntity } from 'shared/types/entities/PostDotEntity';

type Props = {
  showAmount?: boolean
} & PostDotEntity;

export const PostDot = React.memo((props: Props) => {
  const { id, text, total, my, showAmount } = props;
  const { mutate, isPending } = useUpdatePostDot();
 
  const handlePlusClick = () => {
    if (isPending) {
      return;
    }
    
    mutate({
      dotId: id,
      amount: 1,
    });
  };

  const handleMinusClick = () => {
    if (isPending) {
      return;
    }

    mutate({
      dotId: id,
      amount: -1,
    });
  };

  return (
    <Dot
      text={text}
      total={total}
      my={my}
      showAmount={showAmount}
      onPlus={handlePlusClick}
      onMinus={handleMinusClick}
    />
  );
});
