import { Box, Center, Float, Icon, Image } from '@chakra-ui/react';
import React from 'react';
import { IoMdInformationCircle } from 'react-icons/io';

import { useDeleteNoteImage } from 'shared/api/hooks/useDeleteNoteImage';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Checkbox } from 'shared/components/ui/checkbox';
import { ProgressCircleRing, ProgressCircleRoot } from 'shared/components/ui/progress-circle';
import { Tooltip } from 'shared/components/ui/tooltip';
import { useFileImageUrl } from 'shared/hooks/useFileImageUrl';
import { useSpringValue } from 'shared/hooks/useSpringValue';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import { selectFilteredFilesByTag, SelectFilteredFilesByTagReturn } from 'shared/modules/fileUpload/selectors';
import { selectOperation } from 'shared/selectors/operations';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { operationTypes, startSelectNoteImagesOperation, toggleSelectNoteImage } from 'shared/store/slices/appSlice';
import { NoteImageEntity } from 'shared/types/entities/NoteImageEntity';

type NoteBaseImagesProps = {
  noteId: number,
  hasControls?: boolean,
  images: NoteImageEntity[],
};

export const NoteContentImages = React.memo(({ noteId, hasControls, images }: NoteBaseImagesProps) => {
  const visibleImages = React.useMemo(() => images.filter(image => !image._isDeleted), [images]);

  const { files } = useFileUpload();

  const noteFiles = useAppSelector(state => 
    selectFilteredFilesByTag(state, { 
      files, 
      tag: buildFileTag({ zone: 'note', zoneId: noteId, type: 'image' }),
    }));

  if (!visibleImages.length && !noteFiles.length) {
    return null;
  }
  
  return (
    <Box
      my="4"
      gap="1"
      display="flex"
      flexWrap="wrap"
    >
      <ImagesBase
        noteId={noteId}
        images={visibleImages}
        hasControls={hasControls}
      />
      <NoteUploadingImages files={noteFiles} />
    </Box>
  );
});

type WithImageControlsProps = {
  imageId: string,
  noteId: number,
  hasControls?: boolean,
  children: React.ReactNode,
}

const WithImageControls = (props: WithImageControlsProps) => {
  const { noteId, imageId, children, hasControls } = props;
  const operation = useAppSelector(selectOperation);
  const dispatch = useAppDispatch();

  const { mutate: deleteNoteImage } = useDeleteNoteImage();

  const isSelecting = operation.type === operationTypes.SELECT_NOTE_IMAGES && operation.noteId === noteId;
  const isSelected = isSelecting && operation.imageIds.includes(imageId);

  const handleSelectImage = React.useCallback(() => {
    if (isSelecting) {
      dispatch(toggleSelectNoteImage(imageId));
    } else {
      dispatch(startSelectNoteImagesOperation({ imageId, noteId }));
    }
  }, [dispatch, imageId, isSelecting, noteId]);

  const handleDeleteImage = React.useCallback(() => {
    deleteNoteImage({ imageId, noteId });
  }, [deleteNoteImage, noteId, imageId]);

  if (isSelecting) {
    return (
      <Box
        position="relative"
        cursor="pointer"
        onClick={handleSelectImage}
      >
        {children}
        <Float offset="15px" placement="top-end">
          <Checkbox
            borderRadius="full"
            colorPalette="blue"
            radius="full"
            checked={isSelected}
          />
        </Float>
      </Box>
    );
  }

  if (!hasControls) {
    return children;
  }

  return (
    <Menu isContextMenu>
      <MenuTrigger>
        {children}
      </MenuTrigger>
      <MenuList>
        <MenuItem
          label="Select"
          onClick={handleSelectImage}
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

type NoteImagesProps = {
  noteId: number,
  hasControls?: boolean,
  images: NoteImageEntity[],
}

const ImagesBase = ({ noteId, images, hasControls }: NoteImagesProps) => {
  return (
    images.map(({ id, sizes }) => {
      return (
        <WithImageControls
          key={id}
          imageId={id}
          noteId={noteId}
          hasControls={hasControls}
        >
          <NoteImage
            src={sizes.small}
          />
        </WithImageControls>
      );
    })
  );
};

type NoteUploadingImagesProps = {
  files: SelectFilteredFilesByTagReturn
}

const NoteUploadingImages = ({ files }: NoteUploadingImagesProps) => {
  return (
    files.map(({ file, fileId, status, progress, error }) => {
      return (
        <ImagePreview
          key={fileId}
          file={file}
          status={status}
          progress={progress}
          error={error}
        />
      );
    })
  );
};

type NoteImageProps = {
  src: string,
}

const NoteImage = ({ src }: NoteImageProps) => {
  return (
    <Image
      src={src}
      alt="Image"
      border="1px solid"
      borderColor="gray.300"
      rounded="md"
      background="gray.300"
      h="130px"
      w="130px"
      fit="cover"
      p="1px"
    />
  );
};
const ImagePreview = ({ file, status, progress, error }) => {
  const fileUrl = useFileImageUrl(file);
  const value = useSpringValue(progress);

  return fileUrl ? (
    <Box position="relative">
      <NoteImage
        src={fileUrl}
      />

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
    </Box>
  ) : null;
};
