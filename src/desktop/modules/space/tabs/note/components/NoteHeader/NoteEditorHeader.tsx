import React from 'react';

import { Box, Divider, IconButton, Tooltip } from '@chakra-ui/react';
import { BsChatLeftQuote } from 'react-icons/bs';
import { FiBold, FiCode, FiItalic } from 'react-icons/fi';
import { LuStrikethrough, LuUndo, LuRedo, LuSquareCode } from 'react-icons/lu';
import { PiListNumbers, PiListBullets } from 'react-icons/pi';

import { headerHeight } from './constants';

export const NoteEditorHeader = ({ editor }) => {
  const items = [
    {
      label: 'Undo',
      icon: <LuUndo />,
      onClick: () => editor.chain().focus().undo().run(),
      isDisabled: !editor.can().chain().focus().undo().run(),
    },
    {
      label: 'Redo',
      icon: <LuRedo />,
      onClick: () => editor.chain().focus().redo().run(),
      isDisabled: !editor.can().chain().focus().redo().run(),
    },
    {
      label: '1',
      isDivider: true,
    },
    {
      label: 'Bold',
      icon: <FiBold />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isDisabled: !editor.can().chain().focus().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      label: 'Italic',
      icon: <FiItalic />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isDisabled: !editor.can().chain().focus().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    },
    {
      label: 'Strike',
      icon: <LuStrikethrough />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isDisabled: !editor.can().chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
    },
    {
      label: '2',
      isDivider: true,
    },
    {
      label: 'Blockquote',
      icon: <BsChatLeftQuote />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isDisabled: !editor.can().chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
    {
      label: 'Code block',
      icon: <LuSquareCode />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      isDisabled: !editor.can().chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
    },
    {
      label: 'Code',
      icon: <FiCode />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isDisabled: !editor.can().chain().focus().toggleCode().run(),
      isActive: editor.isActive('code'),
    },
    {
      label: '3',
      isDivider: true,
    },
    {
      label: 'Bullet list',
      icon: <PiListBullets />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isDisabled: !editor.can().chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      label: 'Ordered list',
      icon: <PiListNumbers />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isDisabled: !editor.can().chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    // {
    //   label: 'Italic',
    //   icon: <FiItalic />,
    //   onClick: () => editor.chain().focus().toggleItalic().run(),
    //   isDisabled: !editor.can().chain().focus().toggleItalic().run(),
    //   isActive: editor.isActive('italic'),
    // },
  ];

  return (
    <Box
      h={headerHeight}
      // bg="red"
      justifyContent="center"
      alignItems="center"
      gap="1"
      display="flex"
    >
      {items.map((itemProps) => {
        if ('isDivider' in itemProps) {
          return (
            <Divider
              key={itemProps.label}
              orientation="vertical"
              h="20px"
              mx="1"
            />
          );
        }

        const { label, isActive, ...buttonProps } = itemProps;

        return (
          <Tooltip
            key={label}
            label={label}
            openDelay={1000}
          >
            <IconButton
              aria-label={label}
              size="sm"
              h="7"
              minW="7"
              colorScheme={isActive ? 'brand': 'gray'}
              variant={isActive ? 'outline' : 'ghost'}
              {...buttonProps}
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};
