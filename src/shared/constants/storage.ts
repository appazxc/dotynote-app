export const STORAGE_USAGE_JOBS = {
  STORAGE_RECALCULATE: 'storageRecalculate',
  INCREMENT_IMAGE: 'incrementImage',
  INCREMENT_FILE: 'incrementFile',
  INCREMENT_VIDEO: 'incrementVideo',
  INCREMENT_AUDIO: 'incrementAudio',
  INCREMENT_NOTE: 'incrementNote',
  DECREMENT_IMAGE: 'decrementImage',
  DECREMENT_FILE: 'decrementFile',
  DECREMENT_VIDEO: 'decrementVideo',
  DECREMENT_AUDIO: 'decrementAudio',
  DECREMENT_NOTE: 'decrementNote',
} as const;

export const STORAGE_ITEM_TYPES = {
  NOTE: 'note',
  FILE: 'file',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  RECORD: 'record',
  EXCALIDRAW: 'excalidraw',
  TOTAL_SIZE: 'totalSize',
} as const;

export type StorageItemType = typeof STORAGE_ITEM_TYPES[keyof typeof STORAGE_ITEM_TYPES];

export const CREDITS_STORAGE_USAGE = {
  NOTE: 1,
  IMAGE: 10,
  FILE_MB: 1,
  VIDEO_MB: 1,
  AUDIO_MB: 1,
  RECORD_MB: 1,
  TOTAL_MB: 1,
  EXCALIDRAW: 10,
};
