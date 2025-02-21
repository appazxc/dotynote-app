import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

import { MenuItemBase } from 'shared/components/Menu/MenuItemBase';

type Props = {
  onClick: () => void; 
};

export const MenuBack = React.memo(({ onClick }: Props) => {
  return (
    <MenuItemBase
      onClick={onClick}
    ><FaChevronLeft size="10" /></MenuItemBase>
  );
});
