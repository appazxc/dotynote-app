import { Box, Separator, IconButton } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { motion } from 'motion/react';
import React from 'react';
import { FiBold, FiCode, FiItalic } from 'react-icons/fi';
import { LuHeading1, LuRedo, LuSquareCode, LuStrikethrough, LuUndo } from 'react-icons/lu';
import { PiLinkBold, PiListBullets, PiListNumbers } from 'react-icons/pi';
import { RiDoubleQuotesL, RiParagraph } from 'react-icons/ri';

import { Tooltip } from 'shared/components/ui/tooltip';
import { modalIds } from 'shared/constants/modalIds';
import { UrlModal } from 'shared/containers/modals/UrlModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

import { headerHeight } from './constants';

const extraId = 'NoteEditorHeader';

export const NoteEditorHeader = ({ editor }: { editor: Editor }) => {
  const dispatch = useAppDispatch();

  const items = [
    {
      label: 'Undo',
      icon: <LuUndo />,
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().chain().focus().undo().run(),
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
      label: 'Paragraph',
      icon: <RiParagraph />,
      // onClick: () => editor.chain().focus().toggle().run(),
      // isDisabled: !editor.can().chain().focus().toggleParagraph().run(),
      isActive: editor.isActive('paragraph'),
    },
    {
      label: 'Heading',
      icon: <LuHeading1 />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isDisabled: !editor.can().chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive('heading', { level: 1 }),
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
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      isActive: editor.isActive('strike'),
    },
    {
      label: '2',
      isDivider: true,
    },
    {
      label: 'Link',
      icon: <PiLinkBold />,
      onClick: () => dispatch(showModal({ id: modalIds.url, extraId })),
      isActive: editor.isActive('link'),
    },
    {
      label: 'Blockquote',
      icon: <RiDoubleQuotesL />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      disabled: !editor.can().chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
    {
      label: 'Code block',
      icon: <LuSquareCode />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
    },
    {
      label: 'Code',
      icon: <FiCode />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !editor.can().chain().focus().toggleCode().run(),
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
      disabled: !editor.can().chain().focus().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      label: 'Ordered list',
      icon: <PiListNumbers />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive('orderedList'),
    },
    // {
    //   label: 'Italic',
    //   icon: <FiItalic />,
    //   onClick: () => editor.chain().focus().toggleItalic().run(),
    //   disabled: !editor.can().chain().focus().toggleItalic().run(),
    //   isActive: editor.isActive('italic'),
    // },
  ];

  return (
    <>
      <Box
        asChild
        h={headerHeight}
        // bg="red"
        justifyContent="center"
        alignItems="center"
        gap="1"
        display="flex"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {items.map((itemProps) => {
            if ('isDivider' in itemProps) {
              return (
                <Separator
                  key={itemProps.label}
                  orientation="vertical"
                  h="20px"
                  mx="1"
                />
              );
            }

            const { label, isActive, icon, ...buttonProps } = itemProps;

            return (
              <Tooltip
                key={label}
                content={label}
                openDelay={1000}
              >
                <IconButton
                  aria-label={label}
                  size="sm"
                  h="7"
                  minW="7"
                  colorScheme={isActive ? 'brand' : 'gray'}
                  variant={isActive ? 'outline' : 'ghost'}
                  {...buttonProps}
                >{icon}</IconButton>
              </Tooltip>
            );
          })}
        </motion.div>
      </Box>

      <UrlModal extraId={extraId} editor={editor} />
    </>
  );
};
