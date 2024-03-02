import {
  Box,
  Button,
  Container,
} from '@chakra-ui/react';
import { EditorContent } from '@tiptap/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { AutoResizeTextarea } from 'shared/components/AutoResizeTextarea';
import { useEditor } from 'shared/modules/editor/useEditor';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

const schema = z.object({
  title: z
    .string()
    .max(120, {
      message: 'Name must not be longer than 120 characters.',
    }),
});

type FormValues = z.infer<typeof schema>

export const CreateNoteTabContent = () => {
  const { register } = useForm<FormValues>({});

  const editor = useEditor();
  
  return (
    <TabLayout
      footer={(
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            pb="2"
          >
            <Box />
            <Button colorScheme="brand" size="sm">Create</Button>
          </Box>
        </Container>
      )}
    >
      <Container h="full" pt="5">
        <Box
          display="flex"
          flexDirection="column"
          h="full"
        >
          <Box flexShrink="0">
            <AutoResizeTextarea
              placeholder="Title"
              px="0"
              fontSize="x-large"
              variant="plain"
              {...register('title')}
            />
          </Box>
          <Box flexGrow="1" position="relative">
            <Box
              position="absolute"
              w="full"
              h="full"
              onClick={() => {
                editor.commands.focus();
              }}
            />

            <EditorContent editor={editor} />
          </Box>
        </Box>
      </Container>
    </TabLayout>
  );
};

export default CreateNoteTabContent;