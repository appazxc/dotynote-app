import React from 'react';
import { GoFile } from 'react-icons/go';
import { HiOutlineVideoCamera } from 'react-icons/hi2';
import { IoImageOutline } from 'react-icons/io5';
import { PiFileAudioFill } from 'react-icons/pi';
import { SlNotebook } from 'react-icons/sl';

import { createNote } from 'shared/actions/note/createNote';
import { modalIds } from 'shared/constants/modalIds';
import { useCreditsCheck } from 'shared/hooks/useCreditsCheck';
import { useFileUpload } from 'shared/modules/fileUpload';
import { UploadFileType } from 'shared/modules/fileUpload/FileUploadProvider';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

type Props = {
  onCreate: (noteId: string) => void;
  onError?: (error: unknown) => void;
  onClick?: () => void;
  extraId?: string;
}

export const useCreateNoteItems = (props: Props) => {
  const { onCreate, onError, onClick, extraId } = props;
  const dispatch = useAppDispatch();
  const { openFilePicker } = useFileUpload();
  const [isLoading, setIsLoading] = React.useState(false);
  const checkCredits = useCreditsCheck();

  const handleAttachmentClick = React.useCallback((type: UploadFileType) => () => {
    const onFilesAdd = async (files, removeFiles) => {
      setIsLoading(true);

      try {
        await checkCredits(
          { files, resources: { note: 1 } },
          () => dispatch(createNote({
            files,
            onNoteCreate: (noteId) => {
              setIsLoading(false);
              onCreate(noteId);
            },
            removeFiles,
          })));
      } catch(error) {
        onError?.(error);
      } finally {
        setIsLoading(false);
      }
    };

    openFilePicker({
      type,
    }, onFilesAdd);

    onClick?.();
  }, [dispatch, onCreate, openFilePicker, onError, onClick, checkCredits]);
  
  const items = React.useMemo(() => [
    {
      icon: SlNotebook,
      title: 'Text',
      onClick: () => {
        checkCredits(
          { resources: { note: 1 } },
          () => {
            onClick?.();
            dispatch(showModal({ id: modalIds.createNote, extraId }));
          });
      },
    },
    {
      icon: IoImageOutline,
      title: 'Image',
      onClick: handleAttachmentClick('image'),
    },
    {
      icon: HiOutlineVideoCamera,
      title: 'Video',
      onClick: handleAttachmentClick('video'),
      isDisabled: false,
    },
    {
      icon: PiFileAudioFill,
      title: 'Audio',
      onClick: handleAttachmentClick('audio'),
    },
    {
      icon: GoFile,
      title: 'File',
      onClick: handleAttachmentClick('file'),
    },
    // {
    //   icon: <VscRecord size="22" />,
    //   title: 'Record',
    //   to: '/',
    //   isDisabled: true,
    // },
    // {
    //   icon: <PiFeather size="22" />,
    //   title: 'Excalidraw',
    //   to: '/',
    //   isDisabled: true,
    // },
    // {
    //   icon: <PiVideo size="22" />,
    //   title: 'Stream',
    //   to: '/',
    //   description: constructionText,
    //   isDisabled: true,
    // },
    // {
    //   icon: <PiMusicNotes size="22" />,
    //   title: 'Music',
    //   to: '/',
    //   description: constructionText,
    //   isDisabled: true,
    // },
  ], [dispatch, checkCredits, handleAttachmentClick, onClick, extraId]);

  return {
    items,
    isLoading,
  };
};