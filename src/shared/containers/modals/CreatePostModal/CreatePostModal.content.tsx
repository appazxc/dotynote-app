import React from 'react';

import {
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
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreatePost } from 'shared/api/hooks/useCreatePost';
import { AutoResizeTextarea } from 'shared/components/AutoResizeTextarea';
import { EditorContent, useEditor } from 'shared/modules/editor';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

export type Props = {
  noteId: number,
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

const CreatePostModal = ({ noteId, onCreate }: Props) => {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobile);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { mutateAsync } = useCreatePost(noteId);

  const editor = useEditor({});

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
      size={isMobile ? 'full' : '2xl'}
      scrollBehavior="inside"
      returnFocusOnClose={false}
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent maxH="90vh">
          <ModalHeader pb="1">Create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            pt="0"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
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

export default CreatePostModal;