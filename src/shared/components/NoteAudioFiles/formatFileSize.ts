export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 bytes';

  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(1024)); // Находим индекс единицы
  const size = bytes / Math.pow(1024, unitIndex); // Конвертируем размер

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};