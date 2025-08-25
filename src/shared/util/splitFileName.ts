export const splitFileName = (filename: string) => {
  const lastDotIndex = filename.lastIndexOf('.'); // Find the last dot in filename

  if (lastDotIndex === -1) {
    return { name: filename, extension: '' };
  }

  // Split name and extension
  const name = filename.substring(0, lastDotIndex);
  const extension = filename.substring(lastDotIndex + 1);

  return { name, extension };
};