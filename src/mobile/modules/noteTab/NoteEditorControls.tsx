import { Box, IconButton, Separator } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { motion } from 'framer-motion';
import { FiBold, FiCode, FiItalic } from 'react-icons/fi';
import { LuRedo, LuSquareCode, LuStrikethrough, LuUndo } from 'react-icons/lu';
import { PiLinkBold, PiListBullets, PiListNumbers } from 'react-icons/pi';
import { RiDoubleQuotesL } from 'react-icons/ri';

import { Tooltip } from 'shared/components/ui/tooltip';
import { modalIds } from 'shared/constants/modalIds';
import { UrlModal } from 'shared/containers/modals/UrlModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

const headerHeight = '44px';
const extraId = 'NoteEditorHeader';

export const NoteEditorControls = ({ editor }: { editor: Editor }) => {
  const dispatch = useAppDispatch();

  const items = [
    {
      label: 'Undo',
      icon: <LuUndo />,
      onClick: () => editor.chain().undo().run(),
      disabled: !editor.can().chain().undo().run(),
    },
    {
      label: 'Redo',
      icon: <LuRedo />,
      onClick: () => editor.chain().redo().run(),
      disabled: !editor.can().chain().redo().run(),
    },
    {
      label: '1',
      isDivider: true,
    },
    {
      label: 'Bold',
      icon: <FiBold />,
      onClick: () => editor.chain().toggleBold().run(),
      disabled: !editor.can().chain().toggleBold().run(),
      isActive: editor.isActive('bold'),
    },
    {
      label: 'Italic',
      icon: <FiItalic />,
      onClick: () => editor.chain().toggleItalic().run(),
      disabled: !editor.can().chain().toggleItalic().run(),
      isActive: editor.isActive('italic'),
    },
    {
      label: 'Strike',
      icon: <LuStrikethrough />,
      onClick: () => editor.chain().toggleStrike().run(),
      disabled: !editor.can().chain().toggleStrike().run(),
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
      onClick: () => editor.chain().toggleBlockquote().run(),
      disabled: !editor.can().chain().toggleBlockquote().run(),
      isActive: editor.isActive('blockquote'),
    },
    {
      label: 'Code block',
      icon: <LuSquareCode />,
      onClick: () => editor.chain().toggleCodeBlock().run(),
      disabled: !editor.can().chain().toggleCodeBlock().run(),
      isActive: editor.isActive('codeBlock'),
    },
    {
      label: 'Code',
      icon: <FiCode />,
      onClick: () => editor.chain().toggleCode().run(),
      disabled: !editor.can().chain().toggleCode().run(),
      isActive: editor.isActive('code'),
    },
    {
      label: '3',
      isDivider: true,
    },
    {
      label: 'Bullet list',
      icon: <PiListBullets />,
      onClick: () => editor.chain().toggleBulletList().run(),
      disabled: !editor.can().chain().toggleBulletList().run(),
      isActive: editor.isActive('bulletList'),
    },
    {
      label: 'Ordered list',
      icon: <PiListNumbers />,
      onClick: () => editor.chain().toggleOrderedList().run(),
      disabled: !editor.can().chain().toggleOrderedList().run(),
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
    <Box px="4">
      <Box
        overflowX="scroll"
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <Box
          asChild
          h={headerHeight}
          justifyContent="start"
          alignItems="center"
          gap="2"
          display="flex"
          flexWrap="nowrap"
          maxW="max-content"
        
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
                  positioning={{ placement: 'top' }}
                >
                  <IconButton
                    aria-label={label}
                    size="lg"
                    h="8"
                    minW="8"
                    variant={isActive ? 'subtle' : 'ghost'}
                    {...buttonProps}
                  >{icon}</IconButton>
                </Tooltip>
              );
            })}
          </motion.div>
        </Box>

        <UrlModal extraId={extraId} editor={editor} />
      </Box>
    </Box>
  );
};
