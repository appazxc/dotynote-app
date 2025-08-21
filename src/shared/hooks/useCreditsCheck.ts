import React from 'react';

import { modalIds } from 'shared/constants/modalIds';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';
import { UploadFile, useFileUpload } from 'shared/modules/fileUpload/FileUploadProvider';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import {
  getRequiredCreditsForNotes,
  getRequiredCreditsForUploadFiles,
} from 'shared/util/credits';

type WithCreditsCheckParams = {
  files?: UploadFile[];
  notes?: number;
}

export const useCreditsCheck = () => {
  const balanceInfo = useUserBalanceInfo();
  const dispatch = useAppDispatch();
  const { removeFiles } = useFileUpload();

  const checkCredits = React.useCallback(async <T extends (...args: any[]) => any> (
    { files, notes = 0 }: WithCreditsCheckParams,
    operation: T
  ): Promise<ReturnType<T> | void> => {
    const fileCredits = files ? dispatch(getRequiredCreditsForUploadFiles(files)) : 0;
    const noteCredits = getRequiredCreditsForNotes(notes);
    const totalCredits = fileCredits + noteCredits;

    if (totalCredits + balanceInfo.storageUsage > balanceInfo.storageCapacity) {
      removeFiles(files?.map((file) => file.fileId) || []);
      dispatch(showModal({ 
        id: modalIds.storageCapacityReached, 
      }));  
      return;
    }

    return operation();
  }, [dispatch, balanceInfo, removeFiles]);

  return checkCredits;
}; 