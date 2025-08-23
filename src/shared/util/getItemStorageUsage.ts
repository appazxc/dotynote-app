import { CREDITS_STORAGE_USAGE, STORAGE_ITEM_TYPES, StorageItemType } from 'shared/constants/storage';
import { convertSizeToCredits } from 'shared/util/convertSizeToCredits';

export const getItemStorageUsage = (type: StorageItemType, value: number) => {
  switch (type) {
  case STORAGE_ITEM_TYPES.IMAGE:
    return value * CREDITS_STORAGE_USAGE.IMAGE;
  case STORAGE_ITEM_TYPES.NOTE:
    return value * CREDITS_STORAGE_USAGE.NOTE;
  case STORAGE_ITEM_TYPES.FILE:
    return convertSizeToCredits(value, CREDITS_STORAGE_USAGE.FILE_MB);
  case STORAGE_ITEM_TYPES.VIDEO:
    return convertSizeToCredits(value, CREDITS_STORAGE_USAGE.VIDEO_MB);
  case STORAGE_ITEM_TYPES.AUDIO:
    return convertSizeToCredits(value, CREDITS_STORAGE_USAGE.AUDIO_MB);
  case STORAGE_ITEM_TYPES.RECORD:
    return convertSizeToCredits(value, CREDITS_STORAGE_USAGE.RECORD_MB);
  case STORAGE_ITEM_TYPES.EXCALIDRAW:
    return convertSizeToCredits(value, CREDITS_STORAGE_USAGE.EXCALIDRAW);
  case STORAGE_ITEM_TYPES.TOTAL_SIZE:
    return convertSizeToCredits(value, CREDITS_STORAGE_USAGE.TOTAL_MB);
  default:
    throw new Error(`Unknown storage item type: ${type}`);
  }
};