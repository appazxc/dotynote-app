import { Box, Stack, StackProps } from '@chakra-ui/react';
import React from 'react';
import { Photo, default as PhotoAlbum } from 'react-photo-album';

import { NoteVideo } from 'shared/components/NoteVideos/NoteVideo';
import { UploadingVideo } from 'shared/components/NoteVideos/UploadingVideo';
import { useFileUpload } from 'shared/modules/fileUpload';
import { UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import {
  selectUploadEntities,
} from 'shared/modules/fileUpload/fileUploadSelectors';
import { UploadFileEntity } from 'shared/modules/fileUpload/uploadSlice';
import { useUploadEntities } from 'shared/modules/fileUpload/useUploadEntities';
import { useAppSelector } from 'shared/store/hooks';
import { NoteVideoEntity } from 'shared/types/entities/NoteVideoEntity';

type Props = {
  noteId: number;
  hasControls?: boolean;
  videos: NoteVideoEntity[];
  inPost?: boolean;
  size?: 'sm' | 'md';
} & StackProps;

type NoteVideo = Photo & {
  video: NoteVideoEntity;
}

export const NoteVideos = React.memo((props: Props) => {
  const { noteId, hasControls, videos, size, inPost, ...boxProps } = props;
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
    <Box>
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
  
  return (
    <Stack
      {...boxProps}
      gap="2"
      direction="row"
      flexWrap="wrap"
    >
      {filteredNoteFileIds.map((id) => {
        return (
          <NoteVideo
            key={id}
            noteId={noteId}
            id={id}
            size={size}
          />
        );
      })}
      {filteredUploadFiles.map((uploadFile) => {
        return (
          <UploadingVideo
            key={uploadFile.fileId}
            id={uploadFile.fileId}
            filename={uploadFile.file.name}
            fileSize={uploadFile.file.size}
            size={size}

          />
        );
      })}
    </Stack>
  );
});
