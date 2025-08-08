import { Box } from '@chakra-ui/react';

import { EditorToolbar } from 'shared/modules/editor/EditorToolbar';

export const NoteEditorControls = () => {
  return (
    <Box overflowX="auto" h="44px">
      <EditorToolbar isMobile={true} />
    </Box>
  );
};
