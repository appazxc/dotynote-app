import React from 'react';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditorEvents } from '@tiptap/react';
import { debounce } from 'lodash';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateNote } from 'shared/api/hooks/useCreateNote';
import { AutoResizeTextarea } from 'shared/components/AutoResizeTextarea';
import { EditorContent, EditorMenu, EditorView, useEditor } from 'shared/modules/editor';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {
  onCreate?: (id: string) => void,
}

const schema = z.object({
  title: z
    .string()
    .max(120, {
      message: 'Title must not be longer than 120 characters.',
    }),
});

type FormValues = z.infer<typeof schema>

const CreateNoteModal = ({ onCreate }: Props) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { mutateAsync } = useCreateNote();
  const handleEditorUpdate = React.useMemo(() => {
    return debounce(({ editor }: EditorEvents['update']) => {
      const json = editor.getJSON();

      console.log('json', json);
      
    }, 1000);
  }, []);

  const editor = useEditor({ onUpdate: handleEditorUpdate });

  const onSubmit = React.useCallback(async (values) => {
    try {
      const id = await mutateAsync({ ...values, content: editor.getJSON() });

      if (onCreate) {
        onCreate(id);
      }
    } finally {
      dispatch(hideModal());
    }
  }, [dispatch, mutateAsync, editor, onCreate]);

  return (
    <Modal
      isCentered
      isOpen
      size="2xl"
      scrollBehavior="inside"
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent maxH="90vh">
          <ModalHeader pb="1">Create note</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            pt="0"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <Box
              position="sticky"
              zIndex="1"
              top="0"
            >
              <EditorMenu editor={editor} />
            </Box>
            <FormControl isInvalid={!!errors.title}>
              <AutoResizeTextarea
                placeholder="Title"
                px="0"
                fontSize="x-large"
                variant="plain"
                {...register('title')}
              />
              <FormErrorMessage>
                {!!errors.title && errors.title.message}
              </FormErrorMessage>
            </FormControl>

            <EditorContent editor={editor} />
            <EditorView content={editor?.getJSON()} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="brand"
              isLoading={isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default CreateNoteModal;