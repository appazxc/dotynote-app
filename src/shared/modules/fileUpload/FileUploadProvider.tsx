import { nanoid } from 'nanoid';
import React from 'react';

import { uploadFiles } from 'shared/modules/fileUpload/actions/uploadFiles';
import { addFile } from 'shared/modules/fileUpload/uploadSlice';
import { useAppDispatch } from 'shared/store/hooks';

type Props = React.PropsWithChildren<{}>;

export type UploadFileType = 'image' | 'file';

export type TagType = string; // like an ID or something similar to determine where this file belongs.

export type UploadFile = { 
  fileId: string, 
  file: File 
}

export type FilesType = UploadFile[];

export type ZoneType = 'note' | 'post';

type OpenFilePickerParams = {
  zoneId: number,
  type: UploadFileType,
  zone: ZoneType,
}

type FileUploadContextType = { 
  // selectFilesByTag: (tag: TagType, files: FilesType) => FilesType,
  openFilePicker: (params: OpenFilePickerParams) => void,
  files: FilesType,
};

type BuildFileTagType = {
  type: UploadFileType,
  zone: ZoneType,
  zoneId: number
}

type ConfigType = {
  zoneId: number | null,
  zone: ZoneType,
}

const FileUploadContext = React.createContext<FileUploadContextType>(null!);

export const FileUploadProvider = React.memo(({ children }: Props) => {
  const [files, setFiles] = React.useState<FilesType>([]);
  const dispatch = useAppDispatch();

  const handleFileSelect = React.useCallback((event: Event, type: UploadFileType, config: ConfigType) => {
    const target = event.target as HTMLInputElement;
    const files = Array.from(target.files || []);
    const { zone, zoneId } = config;
    
    if (zoneId && files.length > 0) {
      nanoid();

      const newData = files.map(file => ({
        file,
        fileId: nanoid(),
      }));

      newData.forEach(({ fileId, file }) => {
        let fileType = type;
        const maxSize = 10 * 1024 * 1024; // 10mb

        if ( type === 'image' && file.size > maxSize) {
          fileType = 'file';
        }

        dispatch(addFile({ fileId, type: fileType, zone, zoneId }));
      });
      
      setFiles((prev) => [...prev, ...newData]);

      dispatch(uploadFiles(newData));
    }

    target.value = '';
  }, [dispatch]);

  const openFilePicker = React.useCallback((params: OpenFilePickerParams) => {
    const config = {
      zoneId: params.zoneId,
      zone: params.zone,
    };

    if (params.type === 'image') {
      const input = document.createElement('input');
      input.type = 'file'; // Пример для загрузки файлов
      input.accept = 'image/png, image/jpeg, image/gif, image/webp';
      input.multiple = true; 
      input.onchange = (event) => {
        handleFileSelect(event, 'image', config);
        input.value = '';
        input.onchange = null;
      };

      input.click();
    } else if (params.type === 'file') {
      const input = document.createElement('input');
      input.type = 'file'; 
      input.accept = '.pdf,.doc,.docx';
      input.multiple = true; 
      input.onchange = (event) => {
        handleFileSelect(event, 'file', config);
        input.value = '';
        input.onchange = null;
      };

      input.click();
    }
  }, [handleFileSelect]);

  return (
    <FileUploadContext.Provider value={{ files, openFilePicker }}>
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