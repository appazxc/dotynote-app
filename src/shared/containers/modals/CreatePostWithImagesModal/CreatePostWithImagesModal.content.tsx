import { Box, Grid, Image, SimpleGrid } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreatePost } from 'shared/api/hooks/useCreatePost';
import { AutoResizeTextarea } from 'shared/components/AutoResizeTextarea';
import { Button } from 'shared/components/ui/button';
import { CheckboxCard } from 'shared/components/ui/checkbox-card';
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
import { useFileImageUrl } from 'shared/hooks/useFileImageUrl';
import { EditorContent, useEditor } from 'shared/modules/editor';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import { selectFilteredFilesByTag } from 'shared/modules/fileUpload/selectors';
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

const FileImage = ({ file }: { file: File }) => {
  const src = useFileImageUrl(file);

  return src ? (
    <Image
      src={src}
      alt="Image"
      border="1px solid"
      borderColor="gray.300"
      rounded="md"
      background="gray.300"
      aspectRatio={1}
      // h="100px"
      // w="100px"
      fit="cover"
      p="1px"
    />
  ) : null;
};

const CreatePostWithImagesModal = ({ noteId, onCreate }: Props) => {
  const dispatch = useAppDispatch();
  const isMobile = useAppSelector(selectIsMobile);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { files, removeFiles } = useFileUpload();
  const postFiles = useAppSelector(state => 
    selectFilteredFilesByTag(state, { 
      files, 
      tag: buildFileTag({ zone: 'post', zoneId: noteId, type: 'image' }),
    }));
  const { mutateAsync } = useCreatePost(noteId);
  console.log('noteFiles', postFiles);
  const onSubmit = React.useCallback(async () => {
    try {
      const id = await mutateAsync({ });
      
      if (onCreate) {
        onCreate(id);
      }
    } finally {
      dispatch(hideModal());
    }
  }, [dispatch, mutateAsync, onCreate]);

  return (
    <DialogRoot
      open
      placement={!isMobile ? 'center' : undefined}
      size={isMobile ? 'full' : 'sm'}
      scrollBehavior="inside"
      onOpenChange={() => {
        removeFiles(postFiles.map(({ fileId }) => fileId ));
        dispatch(hideModal());
      }}
    >
      <DialogBackdrop />
      <DialogContent asChild>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader><DialogTitle>{files.length} media</DialogTitle></DialogHeader>
          <DialogBody
            pt="0"
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            display="flex"
            flexDirection="column"
            gap="1"
          >
           
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap="10px"
            >
              {files.map(({ fileId, file }) => {
                return <FileImage key={fileId} file={file} />;
              })}
            </Grid>
          </DialogBody>
          <DialogFooter>
            <Grid templateColumns="repeat(2, 1fr)" gap="20px">
              <CheckboxCard
                label="Different posts"
                description="Place images in separate posts"
                checked={true}
                size="sm"
              />
              <CheckboxCard
                label="Compress"
                description="Place images"
                checked={true}
                size="sm"
              />
            </Grid>
          </DialogFooter>
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

export default CreatePostWithImagesModal;