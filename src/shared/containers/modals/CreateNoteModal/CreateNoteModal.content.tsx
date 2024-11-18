import { zodResolver } from '@hookform/resolvers/zod';
import { EditorEvents } from '@tiptap/react';
import debounce from 'lodash/debounce';
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
  const handleEditorUpdate = React.useMemo(() => {
    return debounce(({ editor }: EditorEvents['update']) => {
      const json = editor.getJSON();

      console.log('json', json);
      
    }, 1000);
  }, []);

  const editor = useEditor({ onUpdate: handleEditorUpdate });

  const onSubmit = React.useCallback(async (values) => {
    console.log('values', values);
    try {
      const id = await mutateAsync({ ...values, content: editor.getJSON() });

      if (onCreate) {
        onCreate(id);
      }
    } catch {
      dispatch(hideModal());
    }
  }, [dispatch, mutateAsync, editor, onCreate]);

  return (
    <DialogRoot
      defaultOpen
      placement="center"
      size={isMobile ? 'full' : 'lg'}
      scrollBehavior="inside"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent maxH="90vh">
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