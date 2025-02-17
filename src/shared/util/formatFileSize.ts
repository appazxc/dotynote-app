export const formatFileSize = (bytes: number) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 bytes';

  const index = Math.min(Math.floor(Math.log10(bytes) / 3), units.length - 1);
  const value = bytes / Math.pow(1000, index);

  return `${value.toFixed(2)} ${units[index]}`;
};