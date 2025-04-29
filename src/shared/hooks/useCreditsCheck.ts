import React from 'react';

import { modalIds } from 'shared/constants/modalIds';
import { useUserBalanceInfo } from 'shared/hooks/useUserBalanceInfo';
import { UploadFile, useFileUpload } from 'shared/modules/fileUpload/FileUploadProvider';
import { showModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';
import {
  getRequiredCreditsForCreatingResources,
  getRequiredCreditsForUploadFiles,
} from 'shared/util/credits';

type WithCreditsCheckParams = {
  files?: UploadFile[];
  resources?: { note?: number, post?: number };
}

export const useCreditsCheck = () => {
  const balanceInfo = useUserBalanceInfo();
  const dispatch = useAppDispatch();
  const { removeFiles } = useFileUpload();

  const checkCredits = React.useCallback(async <T extends (...args: any[]) => any> (
    { files, resources }: WithCreditsCheckParams,
    operation: T
  ): Promise<ReturnType<T> | void> => {
    const fileCredits = files ? dispatch(getRequiredCreditsForUploadFiles(files)) : 0;
    const resourceCredits = resources ? getRequiredCreditsForCreatingResources(resources) : 0;
    const totalCredits = fileCredits + resourceCredits;

    if (totalCredits > balanceInfo.remainingCredits) {
      removeFiles(files?.map((file) => file.fileId) || []);
      dispatch(showModal({ 
        id: modalIds.insufficientCredits, 
      }));  
      return;
    }

    return operation();
  }, [dispatch, balanceInfo.remainingCredits, removeFiles]);

  return checkCredits;
}; 