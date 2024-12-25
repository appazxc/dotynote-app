import { nanoid } from 'nanoid';
import React from 'react';

import { uploadFiles } from 'shared/modules/fileUpload/actions/uploadFiles';
import { addFile, deleteFiles } from 'shared/modules/fileUpload/uploadSlice';
import { useAppDispatch } from 'shared/store/hooks';
import { getImageDimensions } from 'shared/util/getImageDimensions';

type Props = React.PropsWithChildren<{}>;

export type UploadFileType = 'image' | 'file';

export type TagType = string; // like an ID or something similar to determine where this file belongs.

export type UploadFile = { 
  fileId: string, 
  file: File,
  objectUrl: string | null,
}

export type ZoneType = 'note' | 'post';

type OpenFilePickerParams = {
  zoneId: number,
  type: UploadFileType,
  zone: ZoneType,
  uploadImmediately?: boolean,
}

export type RemoveFilesType = (fileIds: string[]) => void

export type ReorderFilesType = (fileIds: string[]) => void

type OpenFilePicker = (params: OpenFilePickerParams, onSuccess?: () => void) => void

type FileUploadContextType = { 
  removeFiles: RemoveFilesType,
  reorderFiles: ReorderFilesType,
  openFilePicker: OpenFilePicker,
  files: UploadFile[],
};

type BuildFileTagType = {
  type: UploadFileType,
  zone: ZoneType,
  zoneId: number
}

type ConfigType = {
  zoneId: number | null,
  zone: ZoneType,
  uploadImmediately?: boolean,
}

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
    event: Event, type: UploadFileType, config: ConfigType, onSuccess?: () => void
  ) => {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    const { zone, zoneId, uploadImmediately = true } = config;
    
    if (zoneId && files.length > 0) {
      nanoid();

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

        dispatch(addFile({ fileId, type: fileType, zone, zoneId, dimensions }));
      });
      
      setFiles((prev) => [...prev, ...newData]);

      if (uploadImmediately) {
        dispatch(uploadFiles(newData, removeFiles));
      }

      onSuccess?.();
    }

    target.value = '';
  }, [dispatch, removeFiles]);

  const openFilePicker: OpenFilePicker = React.useCallback((params, onSuccess) => {
    const config = {
      zoneId: params.zoneId,
      zone: params.zone,
      uploadImmediately: params.uploadImmediately,
    };

    if (params.type === 'image') {
      const input = document.createElement('input');
      input.type = 'file'; // Пример для загрузки файлов
      input.accept = 'image/png, image/jpeg, image/gif, image/webp';
      input.multiple = true; 
      input.onchange = (event) => {
        handleFileSelect(event, 'image', config, () => {
          input.value = '';
          input.onchange = null;
          onSuccess?.();
        });
      };

      input.click();
    } else if (params.type === 'file') {
      const input = document.createElement('input');
      input.type = 'file'; 
      input.accept = '.pdf,.doc,.docx';
      input.multiple = true; 
      input.onchange = (event) => {
        handleFileSelect(event, 'file', config), () => {
          input.value = '';
          input.onchange = null;
          onSuccess?.();
        };
      };

      input.click();
    }
  }, [handleFileSelect]);

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

export const buildFileTag = ({ type, zone, zoneId }: BuildFileTagType): TagType => {
  return `${zoneId}${zone}${type}`;
};