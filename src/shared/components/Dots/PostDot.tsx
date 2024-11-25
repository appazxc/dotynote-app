import React from 'react';

import { Dot } from 'shared/components/Dots/Dot';
import { PostDotEntity } from 'shared/types/entities/PostDotEntity';

type Props = {
  showAmount?: boolean
} & PostDotEntity;

export const PostDot = React.memo((props: Props) => {
  const { text, total, my, showAmount } = props;

  const handleOnClick = () => {
    
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
