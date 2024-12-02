import { Box, Center, Float, Icon, Image } from '@chakra-ui/react';
import React from 'react';
import { IoMdInformationCircle } from 'react-icons/io';

import { ProgressCircleRing, ProgressCircleRoot } from 'shared/components/ui/progress-circle';
import { Tooltip } from 'shared/components/ui/tooltip';
import { useSpringValue } from 'shared/hooks/useSpringValue';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import { selectFilteredFilesByTag } from 'shared/modules/fileUpload/selectors';
import { useAppSelector } from 'shared/store/hooks';

type Props = {
  noteId: number,
};

export const NoteBaseImages = React.memo(({ noteId }: Props) => {
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
    <Box
      my="4"
      gap="2"
      display="flex"
      flexWrap="wrap"
    >
      {noteFiles.map(({ file, fileId, status, progress, error }) => {
        return (
          <ImagePreview
            key={fileId}
            file={file}
            status={status}
            progress={progress}
            error={error}
          />
        );
      })}
    </Box>
  );
});

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
      <Image
        src={previewUrl}
        alt="Preview"
        border="2px solid"
        borderColor="gray.300"
        rounded="md"
        h="130px"
        w="130px"
        fit="cover"
        p="1px"
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
          >
            <ProgressCircleRing css={{ '--thickness': '2px' }} />
          </ProgressCircleRoot>
          {/* <Icon fontSize="40px" color="tomato">
            <Md3dRotation />
          </Icon> */}
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
