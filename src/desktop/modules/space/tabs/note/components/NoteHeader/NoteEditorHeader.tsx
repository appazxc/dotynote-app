import React from 'react';

import { Box, IconButton } from '@chakra-ui/react';
import { FiBold } from 'react-icons/fi';

import { headerHeight } from './constants';

export const NoteEditorHeader = ({ editor }) => {
  const buttons = [
    {
      label: 'Bold',
      icon: <FiBold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isDisabled: !editor.can().chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
  ];

  return (
    <Box
      h={headerHeight}
      // bg="red"
      justifyContent="center"
      gap="1"
      display="flex"
    >
      {buttons.map(({ label, isActive, ...buttonProps }) => {
        return (
          <IconButton
            key={label}
            aria-label={label}
            size="sm"
            variant={isActive ? 'solid' : 'ghost'}
            {...buttonProps}
          />
        );
      })}
    </Box>
  );
};
