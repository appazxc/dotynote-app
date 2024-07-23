import { Box, Button } from '@chakra-ui/react';
import { Editor } from '@tiptap/react';

type Props = {
  editor?: Editor
}

export const EditorMenu = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <Box py="2">
      <Button
        size="xs"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        colorScheme="brand"
        variant={editor.isActive('bulletList') ? 'solid' : 'outline'}
      >
        toggleBulletList
      </Button>
    </Box>
  );
};