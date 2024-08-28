import React from 'react';

import { IconButton, Tooltip, TooltipProps } from '@chakra-ui/react';
import { FaPencil } from 'react-icons/fa6';

import { useEditorContext } from 'shared/modules/editor';
import { RwMode, rwModes } from 'shared/modules/noteTab/constants';
import { useAppDispatch } from 'shared/store/hooks';
import { toggleRwMode } from 'shared/store/slices/appSlice';

type Props = {
  rwMode: RwMode,
  tooltip?: Omit<TooltipProps, 'children'>
}

const RwButtonComponent = ({ rwMode, tooltip, ...rest }: Props, ref) => {
  const dispatch = useAppDispatch();
  const editor = useEditorContext();
  
  let button = (
    <IconButton
      ref={ref}
      size="sm"
      position="relative"
      icon={<FaPencil />}
      variant={rwMode === rwModes.READ ? 'ghost' : 'solid'}
      aria-label="Note read/edit"
      {...rest}
      onClick={() => {
        dispatch(toggleRwMode());
        editor.commands.focus('end');
      }}
    />
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