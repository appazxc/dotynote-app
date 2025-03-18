import { handleNoteAttachmentDelete } from 'shared/actions/note/handleNoteAttachmentDelete';
import { api } from 'shared/api';
import { EntityName, entityNames } from 'shared/constants/entityNames';
import { noteSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

type DeleteEntityFactoryParams<T extends EntityName> = {
  entityName: T;
  attachmentField: string;
};

export type DeleteAttachmentParams = {
  entityId: string | number;
  noteId: number;
};

export const deleteNoteAttachmentFactory = <T extends EntityName>({
  entityName,
  attachmentField,
}: DeleteEntityFactoryParams<T>): ((params: DeleteAttachmentParams) => ThunkAction) => {
  return ({ entityId, noteId }) => async (dispatch, getState) => {
    dispatch(
      updateEntity({  
        id: entityId as any,
        type: entityName,
        data: { _isDeleted: true },
      })
    );

    try {
      await api.delete(`/notes/${noteId}/${attachmentField}/${entityId}`);

      const note = noteSelector.getById(getState(), noteId) || { [attachmentField]: [] };

      dispatch(
        updateEntity({
          id: noteId,
          type: entityNames.note,
          data: {
            [attachmentField]: note[attachmentField].filter((id: string) => id !== entityId),
          },
        })
      );

      dispatch(deleteEntity({ id: entityId, type: entityName }));

      dispatch(handleNoteAttachmentDelete(noteId));
    } catch (error) {
      dispatch(
        updateEntity({
          id: entityId as any,
          type: entityName,
          data: { _isDeleted: false },
        })
      );
      throw error;
    }
  };
};