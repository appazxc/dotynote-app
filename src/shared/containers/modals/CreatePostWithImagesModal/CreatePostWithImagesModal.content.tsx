import { Box, Float, Grid, IconButton, Image } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { addMediaToPost } from 'shared/actions/post/addMediaToPost';
import { useCreatePost } from 'shared/api/hooks/useCreatePost';
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
import { DeleteIcon } from 'shared/components/ui/icons';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import { selectFilteredFilesByTag } from 'shared/modules/fileUpload/selectors';
import { updateFile } from 'shared/modules/fileUpload/uploadSlice';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { selectIsMobile } from 'shared/selectors/app/selectIsMobile';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';

export type Props = {
  noteId: number,
  onCreate?: (id: number) => void,
}

const schema = z.object({
  title: z
    .string()
    .max(120, {
      message: 'Title must not be longer than 120 characters.',
    }),
});

type FormValues = z.infer<typeof schema>

type FileImageProps = {
  id: string,
  src: string | null, 
  onRemove: (fileId: string) => void
}

const FileImage = React.memo(({ id, src, onRemove }: FileImageProps) => {
  return src ? (
    <Box position="relative">
      <Image
        src={src}
        alt="Image"
        border="1px solid"
        borderColor="gray.300"
        rounded="md"
        background="gray.300"
        aspectRatio={1}
        fit="cover"
        p="1px"
      />
      <Float placement="bottom-end" offset="15px">
        <IconButton
          size="2xs"
          colorPalette="gray"
          variant="subtle"
          onClick={() => onRemove(id)}
        >
          <DeleteIcon />
        </IconButton>
      </Float>
    </Box>
  ) : null;
});

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
      status: 'idle',
    }));
  const { mutateAsync, isPending } = useCreatePost(noteId);

  const handleFileRemove = React.useCallback((fileId) => {
    if (imgFiles.length === 1) {
      dispatch(hideModal());
    }
    removeFiles([fileId]);
  }, [dispatch, removeFiles, imgFiles]);

  const onSubmit = React.useCallback(async () => {
    try {
      const id = await mutateAsync({});
      
      imgFiles.forEach(({ fileId }) => {
        dispatch(updateFile({
          fileId,
          zone: 'note',
          zoneId: id,
        }));
      });

      dispatch(addMediaToPost(id, imgFiles, removeFiles));
      if (onCreate) {
        onCreate(id);
      }
    } finally {
      dispatch(hideModal());
    }
  }, [dispatch, mutateAsync, onCreate, removeFiles, imgFiles]);

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
          <DialogHeader><DialogTitle>{imgFiles.length} media</DialogTitle></DialogHeader>
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
              {imgFiles.map(({ fileId, objectUrl }) => {
                return (
                  <FileImage
                    key={fileId}
                    id={fileId}
                    src={objectUrl}
                    onRemove={handleFileRemove}
                  />
                );
              })}
            </Grid>
          </DialogBody>
          <DialogFooter>
            <Button
              colorScheme="brand"
              loading={isPending}
              onClick={onSubmit}
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