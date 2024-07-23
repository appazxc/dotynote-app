import React from 'react';

import { IconButton } from '@chakra-ui/react';
import { FaPencil } from 'react-icons/fa6';

import { useEditorContext } from 'shared/modules/editor';
import { RwMode, rwModes } from 'shared/modules/space/tabRoutes/note/constants';
import { useAppDispatch } from 'shared/store/hooks';
import { toggleRwMode } from 'shared/store/slices/appSlice';

type Props = {
  label: string,
  rwMode: RwMode,
}

export const SidebarRwButton = React.memo(({ label, rwMode }: Props) => {
  const dispatch = useAppDispatch();
  const editor = useEditorContext();
  
  return (
    <IconButton
      onClick={() => {
        dispatch(toggleRwMode());
        editor.commands.focus('end');
      }}
      size="sm"
      icon={<FaPencil />}
      variant={rwMode === rwModes.READ ? 'ghost' : 'solid'}
      aria-label={label}
    />
  );
});
