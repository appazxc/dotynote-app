import { uploadNoteFiles } from 'shared/actions/note/uploadFiles';
import { entityApi } from 'shared/api/entityApi';
import { toaster } from 'shared/components/ui/toaster';
import { parseApiError } from 'shared/helpers/api/getApiError';
import { RemoveUploadFiles, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { ThunkAction } from 'shared/types/store';

type Params = {
  note?: Partial<NoteEntity>;
  files: UploadFile[];
  onNoteCreate?: (postId: number) => void;
  onAttachmentsUploaded?: () => void;
  removeFiles: RemoveUploadFiles;
}

export const createNote = (params: Params): ThunkAction => 
  async (dispatch) => {
    const { 
      note,
      files,
      removeFiles,
      onNoteCreate,
      onAttachmentsUploaded,
    } = params;

    try {
      const noteId = await entityApi.note.create<number>(note || {});
    
      onNoteCreate?.(noteId);
        
      await dispatch(uploadNoteFiles({ noteId, files, removeFiles }));
        
      onAttachmentsUploaded?.();
    } catch(error) {
      const parsedError = parseApiError(error);
      toaster.create({
        description: parsedError.message,
      });
      throw error;
    }
  };