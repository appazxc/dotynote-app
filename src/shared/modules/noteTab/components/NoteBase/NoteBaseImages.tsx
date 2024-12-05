import { Box, Center, Float, Icon, Image, Stack } from '@chakra-ui/react';
import React from 'react';
import { IoMdInformationCircle } from 'react-icons/io';

import { ProgressCircleRing, ProgressCircleRoot } from 'shared/components/ui/progress-circle';
import { Tooltip } from 'shared/components/ui/tooltip';
import { useSpringValue } from 'shared/hooks/useSpringValue';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import { selectFilteredFilesByTag } from 'shared/modules/fileUpload/selectors';
import { useAppSelector } from 'shared/store/hooks';
import { NoteImageEntity } from 'shared/types/entities/NoteImageEntity';

type Props = {
  noteId: number,
  images: NoteImageEntity[],
};

export const NoteBaseImages = React.memo(({ noteId, images }: Props) => {
  return (
    <Box
      my="4"
      gap="1"
      display="flex"
      flexWrap="wrap"
    >
      <NoteImages images={images} />
      <NoteUploadingImages noteId={noteId} />
    </Box>
  );
});

const NoteImages = ({ images }) => {
  return (
    images.map(({ id, sizes }) => {
      return (
        <NoteImage
          key={id}
          src={sizes.medium}
        />
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

  console.log('NoteBaseImages', files, noteId, noteFiles);

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

const NoteImage = ({ src }) => {
  return (
    <Image
      src={src}
      alt="Image"
      border="1px solid"
      borderColor="gray.300"
      rounded="md"
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
