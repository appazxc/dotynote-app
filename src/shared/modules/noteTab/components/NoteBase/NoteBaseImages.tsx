import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import React from 'react';

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
      {noteFiles.map(({ file, fileId }) => {
        return <ImagePreview key={fileId} file={file} />;
      })}
    </Box>
  );
});

const ImagePreview = ({ file }) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  return previewUrl ? (
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
  ) : null;
};
