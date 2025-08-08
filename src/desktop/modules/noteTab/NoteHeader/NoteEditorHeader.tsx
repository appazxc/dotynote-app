import { Box } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';
import { motion } from 'motion/react';
// import { FiBold, FiCode, FiItalic } from 'react-icons/fi';
// import { LuHeading1, LuRedo, LuSquareCode, LuStrikethrough, LuUndo } from 'react-icons/lu';
// import { PiLinkBold, PiListBullets, PiListNumbers } from 'react-icons/pi';
// import { RiDoubleQuotesL, RiParagraph } from 'react-icons/ri';

import { UrlModal } from 'shared/containers/modals/UrlModal';
import { EditorToolbar } from 'shared/modules/editor/EditorToolbar';

import { headerHeight } from './constants';

const extraId = 'NoteEditorHeader';

export const NoteEditorHeader = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <Box
        asChild
        h={headerHeight}
        overflowX="auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <EditorToolbar />
        </motion.div>
      </Box>

      <UrlModal extraId={extraId} editor={editor} />
    </>
  );
};
