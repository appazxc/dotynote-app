import { nanoid } from 'nanoid';
import React from 'react';

type Props = React.PropsWithChildren<{}>;

type UploadFileType = 'image' | 'file';

type TagType = string; // like id or something like this

type FilesType = { id: string, type: UploadFileType, tag: TagType, file: File }[];

type FileUploadContextType = { 
  selectFilesByTag: (tag: TagType, files: FilesType) => FilesType,
  openFilePicker: (type: UploadFileType, tag: TagType) => void,
  files: FilesType,
};

const FileUploadContext = React.createContext<FileUploadContextType>(null!);

const styles = { display: 'none' };

export const FileUploadProvider = React.memo(({ children }: Props) => {
  const imageInputRef = React.useRef<HTMLInputElement>(null);
  const filesInputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<FilesType>([]);
  const [currentTag, setCurrentTag] = React.useState<TagType | null>(null);

  const openFilePicker = React.useCallback((type: UploadFileType, tag: TagType) => {
    setCurrentTag(tag);
    if (type === 'image') {
      imageInputRef.current?.click();
    } else if (type === 'file') {
      filesInputRef.current?.click();
    }
  }, []);
  
  const handleFileSelect = React.useCallback((type: UploadFileType, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (files.length > 0 && currentTag) {
      setFiles((prev) => [...prev, ...files.map(file => ({
        file,
        tag: currentTag,
        type,
        id: nanoid(),
      }))]);
    }

    setCurrentTag(null);
    event.target.value = '';
  }, [currentTag]);

  const selectFilesByTag = React.useCallback((tag: TagType, files: FilesType) => {
    return files.filter(({ tag: fileTag }) => tag === fileTag);
  }, []);
  
  return (
    <FileUploadContext.Provider value={{ files, openFilePicker, selectFilesByTag }}>
      {children}

      <input
        ref={imageInputRef}
        multiple
        type="file"
        accept="image/*"
        style={styles}
        onChange={(e) => handleFileSelect('image', e)}
      />
      <input
        ref={filesInputRef}
        multiple
        type="file"
        accept=".pdf,.doc,.docx"
        style={styles}
        onChange={(e) => handleFileSelect('file', e)}
      />
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

export const buildNoteFileTag = (type: UploadFileType, noteId: number) => {
  return `${noteId}${type}`;
};