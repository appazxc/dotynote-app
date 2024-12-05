import { Box, Center, Float, Icon, Image } from '@chakra-ui/react';
import React from 'react';
import { IoMdInformationCircle } from 'react-icons/io';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Checkbox } from 'shared/components/ui/checkbox';
import { ProgressCircleRing, ProgressCircleRoot } from 'shared/components/ui/progress-circle';
import { Tooltip } from 'shared/components/ui/tooltip';
import { useSpringValue } from 'shared/hooks/useSpringValue';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import { selectFilteredFilesByTag } from 'shared/modules/fileUpload/selectors';
import { useAppSelector } from 'shared/store/hooks';
import { NoteImageEntity } from 'shared/types/entities/NoteImageEntity';

type NoteBaseImagesProps = {
  noteId: number,
  hasControls?: boolean,
  onDelete?: (id: string) => void,
  images: NoteImageEntity[],
};

export const NoteBaseImages = React.memo(({ noteId, hasControls, images, onDelete }: NoteBaseImagesProps) => {
  const visibleImages = React.useMemo(() => images.filter(image => !image._isDeleted), [images]);

  return (
    <Box
      my="4"
      gap="1"
      display="flex"
      flexWrap="wrap"
    >
      <NoteImages
        images={visibleImages}
        hasControls={hasControls}
        onDelete={onDelete}
      />
      <NoteUploadingImages noteId={noteId} />
    </Box>
  );
});

type WithImageControlsProps = {
  id: string,
  hasControls?: boolean,
  isSelecting?: boolean,
  isSelected?: boolean,
  children: React.ReactNode,
  onDelete?: NoteBaseImagesProps['onDelete']
}

const WithImageControls = (props: WithImageControlsProps) => {
  const { id, children, hasControls, isSelecting, isSelected, onDelete } = props;

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  if (isSelecting) {
    return (
      <Box position="relative" cursor="pointer">
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
          onClick={() => {}}
        />

        {onDelete && (
          <MenuItem
            label={'Delete'}
            color="red"
            onClick={handleDelete}
          />
        )}
      </MenuList>
    </Menu>
  );
};

type NoteImagesProps = {
  hasControls?: boolean,
  images: NoteImageEntity[],
  onDelete?: NoteBaseImagesProps['onDelete']
}

const NoteImages = ({ images, hasControls, onDelete }: NoteImagesProps) => {
  return (
    images.map(({ id, sizes }) => {
      return (
        <WithImageControls
          key={id}
          id={id}
          hasControls={hasControls}
          isSelecting={false}
          isSelected={false}
          onDelete={onDelete}
        >
          <NoteImage
            src={sizes.small}
          />
        </WithImageControls>
      );
    })
  );
};

const NoteUploadingImages = ({ noteId }) => {
  const { files } = useFileUpload();

  const noteFiles = useAppSelector(state => 
    selectFilteredFilesByTag(state, { 
      files, 
      tag: buildFileTag({ zone: 'note', zoneId: noteId, type: 'image' }) }));

  if (!noteFiles.length) {
    return null;
  }

  return (
    noteFiles.map(({ file, fileId, status, progress, error }) => {
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
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const value = useSpringValue(progress);
  
  React.useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return previewUrl ? (
    <Box position="relative">
      <NoteImage
        src={previewUrl}
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
