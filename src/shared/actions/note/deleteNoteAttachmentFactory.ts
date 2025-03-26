import { handleNoteAttachmentDelete } from 'shared/actions/note/handleNoteAttachmentDelete';
import { api } from 'shared/api';
import { EntityName, entityNames } from 'shared/constants/entityNames';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { noteSelector } from 'shared/selectors/entities';
import { deleteEntity, updateEntity } from 'shared/store/slices/entitiesSlice';
import { ThunkAction } from 'shared/types/store';

type DeleteEntityFactoryParams<T extends EntityName> = {
  entityName: T;
  attachmentField: 'audio' | 'files' | 'images' | 'videos';
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
        id: entityId,
        type: entityName as any,
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
      const apiError = parseApiError(error);

      if (apiError.statusCode === 404) {
        return;
      }
      
      dispatch(
        updateEntity({
          id: entityId,
          type: entityName as any,
          data: { _isDeleted: false },
        })
      );
      throw error;
    }
  };
};