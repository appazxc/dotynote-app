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
 
  const handleOnClick = () => {
    if (isPending) {
      return;
    }
    
    mutate({
      dotId: id,
      action: 'click',
    });
  };

  const handleLongPress = () => {
    if (isPending) {
      return;
    }

    mutate({
      dotId: id,
      action: 'longPress',
    });
  };

  return (
    <Dot
      text={text}
      total={total}
      my={my}
      showAmount={showAmount}
      onClick={handleOnClick}
      onLongPress={handleLongPress}
    />
  );
});
