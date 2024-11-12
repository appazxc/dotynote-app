import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { FaPencil } from 'react-icons/fa6';

import { Tooltip, TooltipProps } from 'shared/components/ui/tooltip';
import { RwMode, rwModes } from 'shared/modules/noteTab/constants';
import { useAppDispatch } from 'shared/store/hooks';
import { toggleRwMode } from 'shared/store/slices/appSlice';

type Props = {
  rwMode: RwMode,
  tooltip?: Omit<TooltipProps, 'children'>
}

const RwButtonComponent = ({ rwMode, tooltip, ...rest }: Props, ref) => {
  const dispatch = useAppDispatch();
  
  let button = (
    <IconButton
      ref={ref}
      size="sm"
      position="relative"
      colorScheme="gray"
      variant={rwMode === rwModes.READ ? 'ghost' : 'solid'}
      aria-label="Note read/edit"
      {...rest}
      onClick={() => {
        dispatch(toggleRwMode());
      }}
    ><FaPencil /></IconButton>
  );

  if (tooltip) {
    button = (
      <Tooltip {...tooltip}>
        {button}
      </Tooltip>
    );
  }

  return button;
};

export const RwButton = React.memo(React.forwardRef(RwButtonComponent));