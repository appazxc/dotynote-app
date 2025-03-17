import { uploadNoteFiles } from 'shared/actions/note/uploadFiles';
import { entityApi } from 'shared/api/entityApi';
import { RemoveUploadFiles, UploadFile } from 'shared/modules/fileUpload/FileUploadProvider';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { ThunkAction } from 'shared/types/store';

type Params = {
  note?: Partial<NoteEntity>;
  files: UploadFile[];
  onCreate?: (postId: number) => void;
  onAttachmentsUploaded?: () => void;
  removeFiles: RemoveUploadFiles;
}

export const createNote = (params: Params): ThunkAction => 
  async (dispatch) => {
    const { 
      note,
      files,
      removeFiles,
      onCreate,
      onAttachmentsUploaded,
    } = params;
    const noteId = await entityApi.note.create<number>(note || {});
    
    onCreate?.(noteId);
    
    await dispatch(uploadNoteFiles({ noteId, files, removeFiles }));
    
    onAttachmentsUploaded?.();
  };