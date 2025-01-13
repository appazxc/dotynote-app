import { entityNames } from 'shared/constants/entityNames';
import { noteDotSelector, noteSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

export const removeNoteDot = (dotId: string): ThunkAction => 
  async (dispatch, getState) => {
    const dot = noteDotSelector.getById(getState(), dotId);
    const note = noteSelector.getById(getState(), dot?.noteId);

    if (!note) {
      return;
    }
    
    dispatch(updateEntity({ 
      type: entityNames.note, 
      id: note.id, 
      data: {
        dots: note.dots.filter((id) => id !== dotId),
      },
    }));

    dispatch(deleteEntity({
      type: entityNames.noteDot,
      id: dotId,
    }));
  };