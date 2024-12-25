import { Box, BoxProps, Center, Float, Icon, Image } from '@chakra-ui/react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import React from 'react';
import { GoClock } from 'react-icons/go';
import { IoMdInformationCircle } from 'react-icons/io';
import { Photo, default as PhotoAlbum } from 'react-photo-album';

import { useDeleteNoteImage } from 'shared/api/hooks/useDeleteNoteImage';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Checkbox } from 'shared/components/ui/checkbox';
import { ProgressCircleRing, ProgressCircleRoot } from 'shared/components/ui/progress-circle';
import { Tooltip } from 'shared/components/ui/tooltip';
import { useSpringValue } from 'shared/hooks/useSpringValue';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import {
  MergedFilteredFile,
  selectFilteredFilesByTag,
} from 'shared/modules/fileUpload/selectors';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, startSelectNoteImagesOperation, toggleSelectNoteImage } from 'shared/store/slices/appSlice';
import { ApiNoteImageEntity, NoteImageEntity } from 'shared/types/entities/NoteImageEntity';

type NoteBaseImagesProps = {
  noteId: number,
  hasControls?: boolean,
  images: NoteImageEntity[],
} & BoxProps;

export const NoteImages = React.memo(({ noteId, hasControls, images, ...boxProps }: NoteBaseImagesProps) => {
  const visibleImages = React.useMemo(() => images.filter(image => !image._isDeleted), [images]);

  const { files } = useFileUpload();

  const imgFiles = useAppSelector(state => 
    selectFilteredFilesByTag(state, { 
      files, 
      tag: buildFileTag({ zone: 'note', zoneId: noteId, type: 'image' }),
    }));

  const photos = React.useMemo(() => {
    return [
      ...visibleImages.map((image) => {
        return ({
          key: image.id,
          src: image.sizes.medium,
          alt: image.filename,
          height: image.height,
          width: image.width,
          image,
        }) as Photo & { image: ApiNoteImageEntity };
      }), 
      ...imgFiles.map(imgFile => {
        return ({
          key: imgFile.fileId,
          src: imgFile.objectUrl,
          alt: 'Uploading image',
          height: imgFile.dimensions.height,
          width: imgFile.dimensions.width,
          uploadImage: imgFile,
        }) as Photo & { uploadImage: MergedFilteredFile };
      })];
  }, [visibleImages, imgFiles]);

  if (!visibleImages.length && !imgFiles.length) {
    return null;
  }
  
  return (
    <LayoutGroup>
      <AnimatePresence>
        <Box {...boxProps}>
          <PhotoAlbum
            layout="rows"
            photos={photos}
            spacing={4}
            targetRowHeight={250}
            rowConstraints={{ singleRowMaxHeight: 250 }}
            render={{
              photo: (_, context) => {
                if ('image' in context.photo) {
                  return (
                    <WithImageControls
                      key={context.photo.key}
                      imageId={context.photo.image.id}
                      noteId={noteId}
                      hasControls={hasControls}
                      src={context.photo.src}
                      height={context.height}
                      width={context.width}
                    />
                  );
                }
                 
                return (
                  <ImagePreview
                    key={context.photo.key}
                    src={context.photo.src}
                    status={context.photo.uploadImage.status}
                    progress={context.photo.uploadImage.progress}
                    error={context.photo.uploadImage.error}
                    height={context.height}
                    width={context.width}
                  />
                );
              },
              container: ({ ref, ...rest }) => (
                <Box
                  ref={ref}
                  {...rest}
                  overflow="hidden"
                  borderRadius="md"
                />
              ),
            }}
          />
        </Box>
      </AnimatePresence>
    </LayoutGroup>
  );
});

type WithImageControlsProps = {
  imageId: string,
  noteId: number,
  hasControls?: boolean,
  src: string,
  width: number,
  height: number,
}

const WithImageControls = (props: WithImageControlsProps) => {
  const { noteId, imageId, src, height, width, hasControls } = props;
  const operation = useAppSelector(selectOperation);
  const dispatch = useAppDispatch();

  const { mutate: deleteNoteImage } = useDeleteNoteImage();

  const isSelecting = operation.type === operationTypes.SELECT_NOTE_IMAGES && operation.noteId === noteId;
  const isSelected = isSelecting && operation.imageIds.includes(imageId);

  const handleImageClick = React.useCallback((event) => {
    event.stopPropagation();

    if (isSelecting) {
      dispatch(toggleSelectNoteImage(imageId));
    }
  }, [dispatch, imageId, isSelecting]);

  const handleImageSelect = React.useCallback((event) => {
    event.stopPropagation();

    if (!isSelecting) {
      dispatch(startSelectNoteImagesOperation({ imageId, noteId }));
    }
  }, [dispatch, imageId, isSelecting, noteId]);

  const handleDeleteImage = React.useCallback(() => {
    deleteNoteImage({ imageId, noteId });
  }, [deleteNoteImage, noteId, imageId]);

  return (
    <Menu isContextMenu enabled={hasControls && !isSelecting}>
      <MenuTrigger>
        <Box
          position="relative"
          cursor="pointer"
        >
          <NoteImage
            src={src}
            height={height}
            width={width}
            onClick={handleImageClick}
          />
          {isSelecting && (
            <Float offset="15px" placement="top-end">
              <Checkbox
                borderRadius="full"
                colorPalette="blue"
                radius="full"
                checked={isSelected}
              />
            </Float>
          )}
        </Box>
      </MenuTrigger>
      <MenuList>
        <MenuItem
          label="Select"
          onClick={handleImageSelect}
        />
        <MenuItem
          label={'Delete'}
          color="red"
          onClick={handleDeleteImage}
        />
      </MenuList>
    </Menu>
  );
};

type NoteImageProps = {
  src: string,
  height: number,
  width: number,
  onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

const NoteImage = ({ height, width, src, onClick }: NoteImageProps) => {
  return (
    <Image
      asChild
      src={src}
      alt="Image"
      background="gray.300"
      height={height}
      width={width}
      fit="cover"
      onClick={onClick}
    >
      <motion.img layout />
    </Image>
  );
};

const ImagePreview = ({ height, width, src, status, progress, error }) => {
  const value = useSpringValue(progress);

  return src ? (
    <Box asChild position="relative">
      <motion.div layout>
        <NoteImage
          height={height}
          width={width}
          src={src}
        />

        {status === 'idle' && (
          <Center
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
            bg="gray.200"
            opacity="0.3"
          >
            <Icon fontSize="30px" color="black">
              <Box>
                <GoClock />
              </Box>
            </Icon>
          </Center>
        )}

        {status === 'pending' && (
          <Center
            position="absolute"
            top="0"
            left="0"
            bottom="0"
            right="0"
          > 
            <ProgressCircleRoot
              size="sm"
              value={value}
              colorPalette="gray"
              animation={'spin 2s linear infinite'}
            >
              <ProgressCircleRing css={{ '--thickness': '2px' }} />
            </ProgressCircleRoot>
          </Center>
        )}
        {status === 'error' && (
          <Float
            offset="15px"
            zIndex="docked"
            cursor="pointer"
          >
            <Tooltip content={error}>
              <Icon fontSize="20px" color="red">
                <Box>
                  <IoMdInformationCircle />
                </Box>
              </Icon>
            </Tooltip>
          </Float>
        )}
      </motion.div>
    </Box>
  ) : null;
};
