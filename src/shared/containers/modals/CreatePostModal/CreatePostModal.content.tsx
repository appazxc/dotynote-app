import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreatePost } from 'shared/api/hooks/useCreatePost';
import { AutoResizeTextarea } from 'shared/components/AutoResizeTextarea';
import { Button } from 'shared/components/ui/button';
import { Field } from 'shared/components/ui/field';
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
      isOpen
      isCentered={!isMobile}
      size={isMobile ? 'full' : '2xl'}
      scrollBehavior="inside"
      returnFocusOnClose={false}
      onClose={() => dispatch(hideModal())}
    >
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            pt="0"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            display="flex"
            flexDirection="column"
          >
            <Field invalid={!!errors.title} errorText={errors.title?.message}>
              <AutoResizeTextarea
                autoFocus
                placeholder="Title"
                px="0"
                fontSize="x-large"
                {...register('title')}
              />
            </Field>

            <EditorContent editor={editor} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="brand"
              loading={isSubmitting}
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