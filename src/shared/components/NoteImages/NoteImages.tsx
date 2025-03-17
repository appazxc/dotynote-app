import { Box, BoxProps } from '@chakra-ui/react';
import React from 'react';
import { Photo, default as PhotoAlbum } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Download from 'yet-another-react-lightbox/plugins/download';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import { ImageWithControls } from 'shared/components/NoteImages/ImageWithControls';
import { UploadingImage } from 'shared/components/NoteImages/UploadingImage';
import { useFileUpload } from 'shared/modules/fileUpload';
import { selectUploadEntities } from 'shared/modules/fileUpload/fileUploadSelectors';
import { useAppSelector } from 'shared/store/hooks';
import { ApiNoteImageEntity, NoteImageEntity } from 'shared/types/entities/NoteImageEntity';
import { downloadImage } from 'shared/util/downloadImage';

type NoteBaseImagesProps = {
  noteId: number;
  hasControls?: boolean;
  images: NoteImageEntity[];
  inPost?: boolean;
} & BoxProps;

type NotePhoto = Photo & { image: ApiNoteImageEntity };

const breakpoints = [
  { breakpoint: 1080, size: 'large' },
  { breakpoint: 640, size: 'medium' }, 
  { breakpoint: 384, size: 'small' },
];

export const NoteImages = React.memo((props: NoteBaseImagesProps) => {
  const { noteId, hasControls, images, inPost, ...boxProps } = props;
  const [index, setIndex] = React.useState(-1);
  const { files } = useFileUpload();

  const notePhotos = React.useMemo(() => images
    .filter(image => !image._isDeleted)
    .map((image) => {
      return ({
        key: image.id,
        src: image.variants.medium,
        alt: image.filename,
        height: image.height,
        width: image.width,
        image,
        srcSet: breakpoints.map(({ breakpoint, size }) => ({
          src: image.variants[size],
          width: breakpoint,
          height: Math.round((image.height / image.width) * breakpoint),
        })),
      }) as NotePhoto;
    }), [images]);

  const noteImageIds = React.useMemo(() => notePhotos.map(noteImage => noteImage.image.id), [notePhotos]);

  const uploadImages = useAppSelector(state => 
    selectUploadEntities(state, { 
      files, 
      noteId,
      type: 'image',
    }));
    
  const photos = React.useMemo(() => {
    return [
      ...notePhotos, 
      ...uploadImages.filter(image => {
        return image.realId ? !noteImageIds.includes(image.realId) : true;
      }).map(imgFile => {
        return ({
          key: imgFile.fileId,
          src: imgFile.objectUrl,
          alt: 'Uploading image',
          height: imgFile.dimensions.height,
          width: imgFile.dimensions.width,
          uploadImageId: imgFile.fileId,
        }) as Photo & { uploadImageId: string };
      })];
  }, [notePhotos, uploadImages, noteImageIds]);

  const handleImageClick = React.useCallback((index) => () => {
    setIndex(index);
  }, []);

  if (!photos.length) {
    return null;
  }
  
  return (
    <>
      <Box {...boxProps}>
        <PhotoAlbum
          layout="rows"
          photos={photos}
          spacing={2}
          targetRowHeight={200}
          rowConstraints={{ 
            singleRowMaxHeight: 250,
            minPhotos: photos.length >= 6 && inPost ? 3 : undefined,
          }}
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
                    width={context.width}
                    onClick={handleImageClick(context.index)}
                  />
                );
              }
                 
              return (
                <UploadingImage
                  key={context.photo.key}
                  noteId={noteId}
                  src={context.photo.src}
                  fileId={context.photo.uploadImageId}
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
          slides={notePhotos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          plugins={[Zoom, Download]}
          carousel={{ finite: true }}
          download={{
            download(props) {
              const slide = props.slide as NotePhoto;

              downloadImage(`/notes/images/${slide.image.id}/original`, slide.image.filename);
            },
          }}
          render={{
            iconZoomIn: () => null,
            iconZoomOut: () => null,
          }}
        />
      </Box>
    </>
  );
});
