import { api } from 'shared/api';
import { entityTypes } from 'shared/constants/entityTypes';
import { postSelector } from 'shared/selectors/entities';
import { addEntity, deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { createFakeId } from 'shared/util/api/createFakeId';

export const createPostDot = (postId: number, { text }: { text: string }): ThunkAction => 
  async (dispatch, getState) => {
    const post = postSelector.getById(getState(), postId);

    if (!post) {
      return;
    }

    const fakeId = createFakeId();
    
    dispatch(addEntity({ 
      type: entityTypes.postDot, 
      data: {
        id: fakeId,
        text,
        my: 1,
        total: 1,
        postId,
      },
    }));

    dispatch(updateEntity({
      type: entityTypes.post, 
      id: postId, 
      data: {
        dots: [...post.dots, fakeId],
      },
    }));

    let dotId: string | null = null;
    try {
      dotId = await api.post<string>(`/posts/${postId}/dots`, { text });
    } finally {
      const { dots } = postSelector.getById(getState(), postId) || { dots: [] };
      const newDots = dots.filter((postDotId) => postDotId !== fakeId);

      if (dotId) {
        newDots.push(dotId);
      }

      dispatch(updateEntity({
        type: entityTypes.post, 
        id: postId, 
        data: {
          dots: newDots,
        },
      }));

      dispatch(deleteEntity({
        type: entityTypes.postDot,
        id: fakeId,
      }));

    }

    return dotId;
  };