import { Grid, Image } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCreatePost } from 'shared/api/hooks/useCreatePost';
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

const FileImage = ({ src }: { src: string | null }) => {
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
  const imgFiles = useAppSelector(state => 
    selectFilteredFilesByTag(state, { 
      files, 
      tag: buildFileTag({ zone: 'post', zoneId: noteId, type: 'image' }),
    }));
  const { mutateAsync } = useCreatePost(noteId);

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
        removeFiles(imgFiles.map(({ fileId }) => fileId ));
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
              {files.map(({ fileId, objectUrl }) => {
                return <FileImage key={fileId} src={objectUrl} />;
              })}
            </Grid>
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

export default CreatePostWithImagesModal;