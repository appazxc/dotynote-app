import {
  Box,
  Button,
  Container,
  Input,
} from '@chakra-ui/react';
import { EditorContent } from "@tiptap/react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useEditor } from 'shared/modules/editor/useEditor';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

const schema = z.object({
  title: z
    .string()
    .max(120, {
      message: "Name must not be longer than 120 characters.",
    }),
});

type FormValues = z.infer<typeof schema>

export const CreateNoteTabContent = () => {
  const { register } = useForm<FormValues>({

  });

  const editor = useEditor();
  
  return (
    <TabLayout>
      <Container>
        <Box pt="10">
          hhello
          <Input
            placeholder="Title"
            {...register('title')}
          />
        </Box>
        <Box>
          <EditorContent editor={editor} />
        </Box>
        <Box>
          <Button colorScheme="brand">Create</Button>
        </Box>
      </Container>
    </TabLayout>
  );
};

export default CreateNoteTabContent;