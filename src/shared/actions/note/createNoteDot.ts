import { api } from 'shared/api';
import { entityTypes } from 'shared/constants/entityTypes';
import { noteSelector } from 'shared/selectors/entities';
import { addEntity, deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';
import { createFakeId } from 'shared/util/api/createFakeId';

export const createNoteDot = (noteId: number, { text }: { text: string }): ThunkAction => 
  async (dispatch, getState) => {
    const note = noteSelector.getById(getState(), noteId);

    if (!note) {
      return;
    }

    const fakeId = createFakeId();
    
    dispatch(addEntity({ 
      type: entityTypes.noteDot, 
      data: {
        id: fakeId,
        text,
        my: 1,
        total: 1,
        noteId,
      },
    }));

    dispatch(updateEntity({
      type: entityTypes.note, 
      id: noteId, 
      data: {
        dots: [...note.dots, fakeId],
      },
    }));

    let dotId: string | null = null;
    try {
      dotId = await api.post<string>(`/notes/${noteId}/dots`, { text });
    } finally {
      const { dots } = noteSelector.getById(getState(), noteId) || { dots: [] };
      const newDots = dots.filter((noteDotId) => noteDotId !== fakeId);

      if (dotId) {
        newDots.push(dotId);
      }

      dispatch(updateEntity({
        type: entityTypes.note, 
        id: noteId, 
        data: {
          dots: newDots,
        },
      }));

      dispatch(deleteEntity({
        type: entityTypes.noteDot,
        id: fakeId,
      }));

    }

    return dotId;
  };