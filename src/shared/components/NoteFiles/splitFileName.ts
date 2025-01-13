export const splitFileName = (filename: string) => {
  const lastDotIndex = filename.lastIndexOf('.'); // Находим последнюю точку в названии файла

  if (lastDotIndex === -1) {
    return { name: filename, extension: '' };
  }

  // Разделяем имя и расширение
  const name = filename.substring(0, lastDotIndex);
  const extension = filename.substring(lastDotIndex + 1);

  return { name, extension };
};