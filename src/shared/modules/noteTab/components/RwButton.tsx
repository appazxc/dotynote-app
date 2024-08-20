import React from 'react';

import { IconButton } from '@chakra-ui/react';
import { FaPencil } from 'react-icons/fa6';

import { useEditorContext } from 'shared/modules/editor';
import { RwMode, rwModes } from 'shared/modules/noteTab/constants';
import { useAppDispatch } from 'shared/store/hooks';
import { toggleRwMode } from 'shared/store/slices/appSlice';

type Props = {
  rwMode: RwMode,
}

const RwButtonComponent = ({ rwMode, ...rest }: Props, ref) => {
  const dispatch = useAppDispatch();
  const editor = useEditorContext();
  
  return (
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
};

export const RwButton = React.memo(React.forwardRef(RwButtonComponent));