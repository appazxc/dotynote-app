import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreatePost } from 'shared/api/hooks/useCreatePost';
import { AutoResizeTextarea } from 'shared/components/AutoResizeTextarea';
import { Button } from 'shared/components/ui/button';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from 'shared/components/ui/dialog';
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
    <DialogRoot
      defaultOpen
      placement={!isMobile ? 'center' : undefined}
      size={isMobile ? 'full' : 'lg'}
      scrollBehavior="inside"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader><DialogTitle>Create post</DialogTitle></DialogHeader>
          <DialogBody
            pt="0"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
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

            <EditorContent editor={editor} minH="40" />
          </DialogBody>

          <DialogFooter>
            <Button
              colorScheme="brand"
              loading={isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />

        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default CreatePostModal;