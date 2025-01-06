import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreateNote } from 'shared/api/hooks/useCreateNote';
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
  const isMobile = useAppSelector(selectIsMobile);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { mutateAsync } = useCreateNote();

  const editor = useEditor();

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      editor.commands.focus('end');
    }
  }, [editor]);

  const onSubmit = React.useCallback(async (values) => {
    try {
      const id = await mutateAsync({ ...values, content: editor.getJSON() });

      if (onCreate) {
        onCreate(id);
      }
    // eslint-disable-next-line no-empty
    } catch(_) {}
  }, [mutateAsync, editor, onCreate]);

  return (
    <DialogRoot
      defaultOpen
      placement="center"
      size={isMobile ? 'full' : 'lg'}
      scrollBehavior="inside"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent asChild maxH="90vh">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader pb="1"><DialogTitle>Create note</DialogTitle></DialogHeader>
          <DialogCloseTrigger />
          <DialogBody
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
                onKeyDown={handleKeyDown}
                {...register('title')}
              />
            </Field>

            <EditorContent
              editor={editor}
              minH="40"
              fontSize="md"
            />
          </DialogBody>

          <DialogFooter>
            <Button
              loading={isSubmitting}
              type="submit"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default CreateNoteModal;