import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import { Photo, default as PhotoAlbum } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import { ImageWithControls } from 'shared/components/NoteImages/ImageWithControls';
import { UploadingImage } from 'shared/components/NoteImages/UploadingImage';
import { buildFileTag, useFileUpload } from 'shared/modules/fileUpload';
import {
  MergedFilteredFile,
  selectFilteredFilesByTag,
} from 'shared/modules/fileUpload/selectors';
import { useAppSelector } from 'shared/store/hooks';
import { ApiNoteImageEntity, NoteImageEntity } from 'shared/types/entities/NoteImageEntity';

type NoteBaseImagesProps = {
  noteId: number,
  hasControls?: boolean,
  images: NoteImageEntity[],
} & BoxProps;

const breakpoints = [
  { breakpoint: 1080, size: 'large' },
  { breakpoint: 640, size: 'medium' }, 
  { breakpoint: 384, size: 'small' },
];

export const NoteImages = React.memo(({ noteId, hasControls, images, ...boxProps }: NoteBaseImagesProps) => {
  const noteImages = React.useMemo(() => images
    .filter(image => !image._isDeleted)
    .map((image) => {
      return ({
        key: image.id,
        src: image.sizes.medium,
        alt: image.filename,
        height: image.height,
        width: image.width,
        image,
        srcSet: breakpoints.map(({ breakpoint, size }) => ({
          src: image.sizes[size],
          width: breakpoint,
          height: Math.round((image.height / image.width) * breakpoint),
        })),
      }) as Photo & { image: ApiNoteImageEntity };
    }), [images]);
  const [index, setIndex] = React.useState(-1);

  const { files } = useFileUpload();

  const imgFiles = useAppSelector(state => 
    selectFilteredFilesByTag(state, { 
      files, 
      tag: buildFileTag({ zone: 'note', zoneId: noteId, type: 'image' }),
    }));

  const photos = React.useMemo(() => {
    return [
      ...noteImages, 
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
  }, [noteImages, imgFiles]);

  if (!photos.length) {
    return null;
  }
  
  return (
    <>
      <Box {...boxProps}>
        <PhotoAlbum
          layout="rows"
          photos={photos}
          spacing={4}
          targetRowHeight={200}
          rowConstraints={{ singleRowMaxHeight: 250 }}
          render={{
            photo: (_, context) => {
              if ('image' in context.photo) {
                return (
                  <ImageWithControls
                    key={context.photo.key}
                    imageId={context.photo.image.id}
                    noteId={noteId}
                    hasControls={hasControls}
                    src={context.photo.src}
                    height={context.height}
                    blurhash={context.photo.image.blurhash}
                    width={context.width}
                    onClick={() => {
                      setIndex(context.index);
                    }}
                  />
                );
              }
                 
              return (
                <UploadingImage
                  key={context.photo.key}
                  src={context.photo.src}
                  status={context.photo.uploadImage.status}
                  error={context.photo.uploadImage.error}
                  height={context.height}
                  width={context.width}
                />
              );
            },
          }}
        />
      </Box>
      <Box
        onClick={(e) => e.stopPropagation()}
        onContextMenu={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <Lightbox
          slides={noteImages}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Zoom]}
          carousel={{ finite: true }}
          render={{
            iconZoomIn: () => null,
            iconZoomOut: () => null,
          }}
        />
      </Box>
    </>
  );
});
