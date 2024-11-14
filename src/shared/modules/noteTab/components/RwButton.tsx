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
      size="xs"
      position="relative"
      colorScheme="gray"
      variant={rwMode === rwModes.READ ? 'ghost' : 'subtle'}
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