import { uploadNoteFiles } from 'shared/actions/note/uploadFiles';
import { entityApi } from 'shared/api/entityApi';
import { RemoveFilesType, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { ThunkAction } from 'shared/types/store';

type Params = {
  note?: Partial<NoteEntity>,
  files: UploadFile[],
  onNoteCreated?: (postId: number) => void,
  onAttachmentsUploaded?: () => void,
  removeFiles: RemoveFilesType,
}

export const createNote = (params: Params): ThunkAction => 
  async (dispatch, getState) => {
    const { 
      note,
      files,
      removeFiles,
      onNoteCreated,
      onAttachmentsUploaded,
    } = params;
    const noteId = await entityApi.note.create<number>(note || {});
    
    onNoteCreated?.(noteId);
    
    await dispatch(uploadNoteFiles({ noteId, files, removeFiles }));
    
    onAttachmentsUploaded?.();
  };