import { Box, BoxProps, StackProps } from '@chakra-ui/react';
import React from 'react';
import { Photo, default as PhotoAlbum } from 'react-photo-album';

import { NoteVideo } from 'shared/components/NoteVideos/NoteVideo';
import { UploadingVideo } from 'shared/components/NoteVideos/UploadingVideo';
import { useUploadEntities } from 'shared/modules/fileUpload/useUploadEntities';
import { NoteVideoEntity } from 'shared/types/entities/NoteVideoEntity';

type Props = {
  noteId: number;
  extraId?: number | string;
  hasControls?: boolean;
  videos: NoteVideoEntity[];
  size?: 'sm' | 'md';
} & BoxProps;

type NoteVideo = Photo & {
  video: NoteVideoEntity;
}

export const NoteVideos = React.memo((props: Props) => {
  const { noteId, hasControls, videos, size, extraId, ...boxProps } = props;
  const inPost = !!extraId;
  const uploadVideoEntities = useUploadEntities({
    noteId,
    type: 'video',
  });

  const galleryVideos = React.useMemo(() => 
    videos
      .filter(video => !video._isDeleted)
      .sort((a, b) => a.pos - b.pos)
      .map((video) => {
        return ({
          key: video.id,
          height: video.height,
          width: video.width,
          video,
        }) as NoteVideo;
      }), [videos]);
      
  const videoIds = React.useMemo(() => galleryVideos.map(noteImage => noteImage.video.id), [galleryVideos]);

  const galleryItems = React.useMemo(() => {
    return [
      ...galleryVideos,
      ...uploadVideoEntities.filter(video => {
        return video.realId ? !videoIds.includes(video.realId) : true;
      }).map(videoFile => {
        return ({
          key: videoFile.fileId,
          src: videoFile.objectUrl,
          height: videoFile.dimensions.height,
          width: videoFile.dimensions.width,
          uploadVideoId: videoFile.fileId,
        }) as Photo & { uploadVideoId: string };
      })];
  }, [uploadVideoEntities, galleryVideos, videoIds]);

  if (!galleryItems.length) {
    return null;
  }
  
  return (
    <Box {...boxProps}>
      <PhotoAlbum
        layout="rows"
        photos={galleryItems}
        spacing={2}
        targetRowHeight={200}
        rowConstraints={{ 
          singleRowMaxHeight: 250,
          minPhotos: galleryItems.length >= 6 && inPost ? 3 : undefined,
        }}
        render={{
          photo: (_, context) => {
            if ('video' in context.photo) {
              return (
                <NoteVideo
                  key={context.photo.video.id}
                  noteId={noteId}
                  extraId={extraId}
                  videoId={context.photo.video.id}
                  width={context.width}
                  height={context.height}
                />
              );
            }
                 
            return (
              <UploadingVideo
                key={context.photo.key}
                fileId={context.photo.uploadVideoId}
                height={context.height}
                width={context.width}
              />
            );
          },
        }}
      />
    </Box>
  );
});
