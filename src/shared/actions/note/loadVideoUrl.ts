import { api } from 'shared/api';
import { entityNames } from 'shared/constants/entityNames';
import { noteVideoSelector } from 'shared/selectors/entities';
import { updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { invariant } from 'shared/util/invariant';
import { isUrlExpired } from 'shared/util/isUrlExpired';

export const loadVideoUrl = (videoId: string, gracePeriod?: number): ThunkAction => 
  async (dispatch, getState) => {
    const noteVideo = noteVideoSelector.getById(getState(), videoId);

    invariant(noteVideo, 'Note video is missing');

    if (!isUrlExpired(noteVideo.url, gracePeriod)) {
      return;
    }

    const url = await api.get<string>(`/notes/videos/${videoId}/signed-url`);

    dispatch(updateEntity({
      type: entityNames.noteVideo,
      id: videoId,
      data: { 
        url,
      },
    }));
  };