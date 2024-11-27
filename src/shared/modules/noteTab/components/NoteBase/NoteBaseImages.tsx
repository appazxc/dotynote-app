import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import React from 'react';

import { buildNoteFileTag, useFileUpload } from 'shared/components/FileUploadProvider';

type Props = {
  noteId: number,
};

export const NoteBaseImages = React.memo(({ noteId }: Props) => {
  const { files, selectFilesByTag } = useFileUpload();
  
  const noteFiles = React.useMemo(() => {
    return selectFilesByTag(buildNoteFileTag('image', noteId), files);
  }, [noteId, files, selectFilesByTag]);

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
      {noteFiles.map(({ file, id }) => {
        return <ImagePreview key={id} file={file} />;
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
      borderColor="gray.600"
      rounded="md"
      h="130px"
      w="200px"
      fit="cover"
      p="1px"
    />
  ) : null;
};
