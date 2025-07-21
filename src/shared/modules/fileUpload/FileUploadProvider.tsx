import { nanoid } from 'nanoid';
import React from 'react';

import { toaster } from 'shared/components/ui/toaster';
import { addFile, deleteFiles } from 'shared/modules/fileUpload/uploadSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { createReactContext } from 'shared/util/createReactContext';
import { emitter } from 'shared/util/emitter';
import { getFileDimensions } from 'shared/util/getFileDimensions';
import { getFileDuration } from 'shared/util/getFileDuration';

type Props = React.PropsWithChildren<{}>;

export type UploadFileType = 'image' | 'file' | 'audio' | 'video';

export type UploadFile = { 
  fileId: string; 
  file: File;
  objectUrl: string | null;
}

type OpenFilePickerParams = {
  noteId?: string;
  type: UploadFileType;
}

export type RemoveUploadFiles = (fileIds: string[], onRemoved?: () => void) => void

export type ReorderUploadFiles = (fileIds: string[]) => void

export type GetUploadFiles = () => UploadFile[]

type OnFilesAdd = (files: UploadFile[], removeFiles: RemoveUploadFiles) => void

type OpenFilePicker = (
  params: OpenFilePickerParams, 
  onFilesAdd?: OnFilesAdd
) => void

type FileUploadContextType = { 
  removeFiles: RemoveUploadFiles;
  reorderFiles: ReorderUploadFiles;
  openFilePicker: OpenFilePicker;
  files: UploadFile[];
};

const FileUploadContext = createReactContext<FileUploadContextType>();

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

  const removeFiles: RemoveUploadFiles = React.useCallback((fileIds, onRemoved) => {
    files
      .filter(({ fileId }) => fileIds.includes(fileId))
      .forEach(({ objectUrl, fileId }) => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
        }

        emitter.removeAllListeners(`cancelFileUpload:${fileId}`);
      });
      
    setFiles(prevFiles => prevFiles.filter(file => !fileIds.includes(file.fileId)));
    
    setTimeout(() => {
      dispatch(deleteFiles(fileIds));
      onRemoved?.();
    });
  }, [files, dispatch]);

  const handleFileSelect = React.useCallback(async (
    event: Event, 
    type: UploadFileType, 
    noteId: string | undefined, 
    onFilesAdd?: (files: UploadFile[], removeFiles: RemoveUploadFiles) => void
  ) => {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    
    if (files.length > 0) {
      const newData = await Promise.all(files.map(async file => {
        const objectUrl = type === 'image' || type === 'video' ? URL.createObjectURL(file) : null;
        const dimensions = await getFileDimensions(file);
        const duration = await getFileDuration(file);
        console.log('objectUrl', objectUrl);
        return ({
          file,
          fileId: nanoid(),
          objectUrl,
          dimensions,
          duration,
        });
      }));

      newData.forEach(({ fileId, file, dimensions, duration }) => {
        let fileType = type;
        const MAX_PIXELS = 12000;
        const MAX_IMAGE_SIZE = 10 * 10 * 1024 * 1024; // 10mb
        const MAX_SIZE = 4294967296; // 4gb
        const isImageTooLarge = type === 'image'
          && (file.size > MAX_IMAGE_SIZE || dimensions.width >= MAX_PIXELS || dimensions.height >= MAX_PIXELS);
        const isFileTooLarge = file.size >= MAX_SIZE;
        
        if (isImageTooLarge) {
          fileType = 'file';
        }

        if (isFileTooLarge) {
          toaster.create({
            description: 'Maximum file size is 4GB.',
          });
          return;
        }
        dispatch(addFile({ 
          fileId,
          type: fileType,
          noteId,
          dimensions,
          duration,
          filename: file.name,
        }));
      });
      
      const newFiles = newData.map(({ dimensions, ...rest }) => rest);

      setFiles((prev) => [...prev, ...newFiles]);

      onFilesAdd?.(newFiles, removeFiles);
    }

    target.value = '';
  }, [dispatch, removeFiles]);

  const createAndClickInput = React.useCallback((
    noteId: string | undefined, 
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
    case 'video': 
      createAndClickInput(noteId, type, onFilesAdd, 'video/mp4,video/quicktime');
      break;
    default:
      console.error(`Unsupported file type: ${type}`);
    }
  }, [createAndClickInput]);

  return (
    <FileUploadContext.Provider
      value={{ 
        files,
        openFilePicker,
        removeFiles,
        reorderFiles,
      }}
    >
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