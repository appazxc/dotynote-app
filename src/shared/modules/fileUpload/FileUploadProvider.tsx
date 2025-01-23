import { nanoid } from 'nanoid';
import React from 'react';

import { addFile, deleteFiles } from 'shared/modules/fileUpload/uploadSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { getImageDimensions } from 'shared/util/getImageDimensions';

type Props = React.PropsWithChildren<{}>;

export type UploadFileType = 'image' | 'file' | 'audio';

export type UploadFile = { 
  fileId: string, 
  file: File,
  objectUrl: string | null,
}

type OpenFilePickerParams = {
  noteId?: number,
  type: UploadFileType,
  uploadImmediately?: boolean,
}

export type RemoveFilesType = (fileIds: string[]) => void

export type ReorderFilesType = (fileIds: string[]) => void

type OnFilesAdd = (files: UploadFile[], removeFiles: RemoveFilesType) => void

type OpenFilePicker = (
  params: OpenFilePickerParams, 
  onFilesAdd?: OnFilesAdd
) => void

type FileUploadContextType = { 
  removeFiles: RemoveFilesType,
  reorderFiles: ReorderFilesType,
  openFilePicker: OpenFilePicker,
  files: UploadFile[],
};

const FileUploadContext = React.createContext<FileUploadContextType>(null!);

export const FileUploadProvider = React.memo(({ children }: Props) => {
  const [files, setFiles] = React.useState<UploadFile[]>([]);
  const dispatch = useAppDispatch();

  const reorderFiles = React.useCallback((fileIds) => {
    setFiles(prevFiles => {
      const newOrderFiles = [...prevFiles].sort((a, b) => {
        return fileIds.indexOf(a.fileId) - fileIds.indexOf(b.fileId);
      });

      return newOrderFiles;
    });
  }, []);

  const removeFiles = React.useCallback((fileIds: string[]) => {
    files
      .filter(({ fileId }) => fileIds.includes(fileId))
      .forEach(({ objectUrl }) => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }
      });
      
    setFiles(prevFiles => prevFiles.filter(file => !fileIds.includes(file.fileId)));
    setTimeout(() => {
      dispatch(deleteFiles(fileIds));
    });
  }, [files, dispatch]);

  const handleFileSelect = React.useCallback(async (
    event: Event, 
    type: UploadFileType, 
    noteId: number | undefined, 
    onFilesAdd?: (files: UploadFile[], removeFiles: RemoveFilesType) => void
  ) => {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    
    if (files.length > 0) {
      const newData = await Promise.all(files.map(async file => {
        const objectUrl = type === 'image' ? URL.createObjectURL(file) : null;
        const dimensions = type === 'image' ? await getImageDimensions(file) : { width: 0, height: 0 };

        return ({
          file,
          fileId: nanoid(),
          objectUrl,
          dimensions,
        });
      }));

      newData.forEach(({ fileId, file, dimensions }) => {
        let fileType = type;
        const maxSize = 10 * 1024 * 1024; // 10mb

        if (type === 'image' && file.size > maxSize) {
          fileType = 'file';
        }

        dispatch(addFile({ fileId, type: fileType, noteId, dimensions }));
      });
      
      const newFiles = newData.map(({ dimensions, ...rest }) => rest);

      setFiles((prev) => [...prev, ...newFiles]);

      onFilesAdd?.(newFiles, removeFiles);
    }

    target.value = '';
  }, [dispatch, removeFiles]);

  const createAndClickInput = React.useCallback((
    noteId: number | undefined, 
    type: UploadFileType, 
    onFilesAdd: OnFilesAdd | undefined, 
    accept?: string) => {
    const input = document.createElement('input');
    input.type = 'file'; // Пример для загрузки файлов
    input.multiple = true; 

    if (accept) {
      input.accept = accept;
    }
    
    input.onchange = (event) => {
      handleFileSelect(event, type, noteId, onFilesAdd);
      input.value = '';
      input.onchange = null;
    };

    input.click();
  }, [handleFileSelect]);

  const openFilePicker: OpenFilePicker = React.useCallback((params, onFilesAdd) => {
    const { noteId, type } = params;
    
    switch(type) {
    case 'image': 
      createAndClickInput(noteId, type, onFilesAdd, 'image/png, image/jpeg, image/gif, image/webp');
      break;
    case 'file': 
      createAndClickInput(noteId, type, onFilesAdd);
      break;
    case 'audio': 
      createAndClickInput(noteId, type, onFilesAdd, 'audio/mpeg,audio/wav,audio/ogg,audio/aac,audio/flac');
      break;
    default:
      console.error(`Unsupported file type: ${type}`);
    }
  }, [createAndClickInput]);

  return (
    <FileUploadContext.Provider value={{ files, openFilePicker, removeFiles, reorderFiles }}>
      {children}
    </FileUploadContext.Provider>
  );
});

export const useFileUpload = () => {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error('useFileUpload must be used within a FileUploadProvider');
  }
  return context;
};